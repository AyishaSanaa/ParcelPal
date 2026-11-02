
export default function PackageCard({ item, onMarkDelivered }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className={`rounded-2xl p-4 text-3xl ${item.color}`}>
        {item.icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.store}</p>

        <p className="mt-2 text-xs text-gray-500">
          Ordered: {item.date}
        </p>

        <p className="mt-1 text-xs font-semibold text-purple-700">
          {item.days}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className={`rounded-full px-3 py-2 text-xs font-semibold ${
          item.status === "Delivered"
            ? "bg-green-100 text-green-800"
            : "bg-purple-100 text-purple-800"
        }`}>
          {item.status}
        </span>

        {item.status !== "Delivered" && (
          <button
            onClick={onMarkDelivered}
            className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-800"
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  );
}
