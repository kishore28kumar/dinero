export function OnlineIndicator() {
  return (
    <div className="bg-zinc-700 p-5">
      <button className="btn btn-primary relative">
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500"></span>
        Button
      </button>
    </div>
  );
}
