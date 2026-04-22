interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0, 0, 0, 0.8)",
        border: "1px solid #0ff",
        color: "#0ff",
        padding: "10px 16px",
        fontFamily: "monospace",
        fontSize: 14,
        zIndex: 30,
      }}
    >
      {message}
    </div>
  );
}
