import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Recording() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [debugAngle, setDebugAngle] = useState(0);
  const [error, setError] = useState('');
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const stateRef = useRef<'up' | 'down'>('up');
  const animationRef = useRef<number>();

  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numPoses: 1,
        });
        poseLandmarkerRef.current = landmarker;
        setModelReady(true);
      } catch (err) {
        console.error(err);
        setError('Could not start camera or AI model. Please allow camera permission and reload.');
      }
    }
    setup();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (!modelReady || !cameraReady) return;

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const drawingUtils = new DrawingUtils(ctx);

    function detect() {
      if (video.readyState >= 2 && poseLandmarkerRef.current) {
        const result = poseLandmarkerRef.current.detectForVideo(video, performance.now());
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (result.landmarks && result.landmarks.length > 0) {
          const landmarks = result.landmarks[0];
          drawingUtils.drawLandmarks(landmarks, { radius: 3 });
          drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS);

          const leftShoulder = landmarks[11];
          const leftHip = landmarks[23];
          const leftKnee = landmarks[25];

          if (leftShoulder && leftHip && leftKnee) {
            const angleRad = Math.atan2(leftShoulder.y - leftHip.y, leftShoulder.x - leftHip.x) -
                              Math.atan2(leftKnee.y - leftHip.y, leftKnee.x - leftHip.x);
            let angleDeg = Math.abs(angleRad * (180 / Math.PI));
            if (angleDeg > 180) angleDeg = 360 - angleDeg;
            setDebugAngle(angleDeg);

            if (angleDeg < 155 && stateRef.current === 'up') {
              stateRef.current = 'down';
            } else if (angleDeg > 165 && stateRef.current === 'down') {
              stateRef.current = 'up';
              setRepCount((prev) => prev + 1);
            }
          }
        }
      }
      animationRef.current = requestAnimationFrame(detect);
    }
    detect();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [modelReady, cameraReady]);

  const finishTest = () => {
    navigate(`/results/${testId}?reps=${repCount}`);
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <Card className="shadow-hero border-2 border-secondary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary">Recording: {testId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-destructive text-center">{error}</p>}
          {!modelReady && !error && (
            <p className="text-center text-muted-foreground">Loading AI model...</p>
          )}
          <div className="relative">
            <div className="absolute top-3 left-3 z-10 rounded-md bg-black/45 px-3 py-1 text-sm font-medium text-white">
              Position full body within frame
            </div>
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-md bg-black/45 px-3 py-1 text-sm font-medium text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span>REC</span>
            </div>
            <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg border-2 border-secondary/30" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
          </div>
          <p className="text-center text-3xl font-bold text-primary">Reps: {repCount}</p>
          <p className="text-center text-sm text-muted-foreground">Debug angle: {debugAngle.toFixed(3)}</p>
          <Button className="w-full bg-success-gradient hover:opacity-90 text-white" onClick={finishTest}>
            Finish Test
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/test-selection')}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}