import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const userId = localStorage.getItem('user_id');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userText = input;
    setInput('');
    setSending(true);

    await supabase.from('messages').insert({
      user_id: Number(userId),
      role: 'user',
      content: userText,
    });
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: userText }]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }],
          }),
        }
      );
      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not respond right now.';

      await supabase.from('messages').insert({
        user_id: Number(userId),
        role: 'assistant',
        content: aiReply,
      });
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: aiReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: 'Error reaching AI service.' }]);
    }

    setSending(false);
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto flex flex-col">
      <Card className="shadow-hero border-2 border-accent/20 flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" />
            <CardTitle className="text-2xl text-accent">AI Assistant</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[60vh] min-h-[300px]">
            {messages.length === 0 && (
              <p className="text-muted-foreground text-center py-8">Ask me anything about your training!</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-lg bg-muted px-4 py-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={sending}
            />
            <Button onClick={sendMessage} disabled={sending}>
              {sending ? '...' : 'Send'}
            </Button>
          </div>

          <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}