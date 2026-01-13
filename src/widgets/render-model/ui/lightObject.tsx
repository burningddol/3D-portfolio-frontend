const LightObject = () => {
  return (
    <>
      <ambientLight intensity={0.27} />

      <directionalLight position={[0, 10, 30]} intensity={0.28} castShadow />
      <directionalLight position={[-10, 12, -50]} intensity={1.25} castShadow />
    </>
  );
};

export default LightObject;

/*<spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={2048}
        castShadow
      />*/
