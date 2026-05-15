import { useEffect, useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls, Environment, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { DRACOLoader, KTX2Loader } from "three-stdlib";

// Setup loaders for compressed assets
const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/");

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const ModelViewer = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, -0.5, 0]
}: ModelViewerProps) => {
  const { gl } = useThree();

  // Create and configure KTX2 loader in a stable way
  const ktx2 = useMemo(() => {
    const loader = new KTX2Loader();
    loader.setTranscoderPath("https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/");
    loader.detectSupport(gl);
    return loader;
  }, [gl]);

  const { scene, cameras, animations } = useGLTF(modelPath, undefined, undefined, (loader: any) => {
    loader.setKTX2Loader(ktx2);
    loader.setDRACOLoader(dracoLoader);
  });

  // Apply fallback materials if textures fail to avoid grey silhouette
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Only apply if no map exists or if it's currently a default material
        if (!child.material.map) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.3;

          const name = child.name.toLowerCase();
          if (name.includes('wood') || name.includes('oak') || name.includes('walnut')) {
            child.material.color.set('#5d4037'); // Warm wood tone
          } else if (name.includes('metal') || name.includes('steel') || name.includes('frame')) {
            child.material.color.set('#b0b0b0'); // Steel/Metal tone
            child.material.metalness = 0.8;
          } else if (name.includes('glass') || name.includes('transp')) {
            child.material.transparent = true;
            child.material.opacity = 0.8;
            child.material.color.set('#a0d8ef');
          }
        }
      }
    });
  }, [scene]);

  // Handle animations - attach to the scene itself for better compatibility
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && names.length > 0) {
      console.log(`ModelViewer: Playing ${names.length} animations for ${modelPath}`);
      names.forEach(name => {
        const action = actions[name];
        if (action) {
          action.reset().play();
        }
      });
    }
  }, [actions, names, modelPath]);

  // Use the first camera from GLB if available
  const glbCam = (cameras && cameras.length > 0) ? cameras[0] : null;

  return (
    <>
      <primitive object={scene} scale={scale} position={position} rotation={rotation} />
      {glbCam instanceof THREE.PerspectiveCamera ? (
        <PerspectiveCamera
          makeDefault
          position={glbCam.position}
          rotation={glbCam.rotation}
          fov={glbCam.fov}
          near={glbCam.near}
          far={glbCam.far}
        />
      ) : (
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
      )}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#ffccaa" />
      <Environment preset="apartment" />
    </>
  );
};

// Preload helper
export const preloadModel = (modelPath: string) => {
  useGLTF.preload(modelPath, undefined, undefined, (loader) => {
    loader.setKTX2Loader(ktx2Loader);
  });
};
