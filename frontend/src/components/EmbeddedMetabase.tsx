export const EmbeddedMetbase = ({ token }) => {
  if (!token) {
    return null;
  }

  return (
    <iframe
      src={`/login?key=${token}`}
      height={500}
      style={{
        width: "100%",
        flexGrow: "1",
      }}
    />
  );
};
