export default function Skeleton({
  width = "100%",
  height = "14",
  borderRadius = "",
  backgroundColor,
  darkModeBackgroundColor,
  count = 1,
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden animate-shimmer 
            after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:[background-size:400%_100%] after:[animation:inherit] 
            bg-[${backgroundColor}] dark:bg-[${darkModeBackgroundColor}]
            `}
          style={{
            height: height,
            width: width,
            borderRadius: borderRadius,
            marginBottom: count > 1 ? 8 : 0,
          }}
        />
      ))}
    </>
  );
}
