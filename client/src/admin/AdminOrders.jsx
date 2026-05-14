import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  ShoppingBag,
  FileText,
  Image,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  X,
  Calendar,
  Phone,
  User,
  Package,
  MessageSquare,
} from "lucide-react";

const API = "http://localhost:4000/api/orders";

const statuses = [
  {
    value: "pending",
    label: "Очікує",
    icon: <Clock3 size={14} />,
    color: "bg-yellow-400/20 text-yellow-300",
    borderColor: "border-yellow-400/30",
  },
  {
    value: "processing",
    label: "В роботі",
    icon: <Truck size={14} />,
    color: "bg-blue-400/20 text-blue-300",
    borderColor: "border-blue-400/30",
  },
  {
    value: "done",
    label: "Завершено",
    icon: <CheckCircle2 size={14} />,
    color: "bg-green-400/20 text-green-300",
    borderColor: "border-green-400/30",
  },
  {
    value: "cancelled",
    label: "Скасовано",
    icon: <XCircle size={14} />,
    color: "bg-red-400/20 text-red-300",
    borderColor: "border-red-400/30",
  },
];

const lists = [
  {
    id: "all",
    label: "Всі",
    icon: <ShoppingBag size={16} />,
    color: "text-gray-400",
  },
  {
    id: "pending",
    label: "Очікує",
    icon: <Clock3 size={16} />,
    color: "text-yellow-400",
  },
  {
    id: "processing",
    label: "В роботі",
    icon: <Truck size={16} />,
    color: "text-blue-400",
  },
  {
    id: "done",
    label: "Завершено",
    icon: <CheckCircle2 size={16} />,
    color: "text-green-400",
  },
  {
    id: "cancelled",
    label: "Скасовано",
    icon: <XCircle size={16} />,
    color: "text-red-400",
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeList, setActiveList] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API}/${id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusData = (status) => {
    return statuses.find((s) => s.value === status) || statuses[0];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesList = activeList === "all" || order.status === activeList;
    const matchesSearch =
      searchQuery === "" ||
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery) ||
      order.service?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesList && matchesSearch;
  });

  const getListCount = (id) => {
    if (id === "all") return orders.length;
    return orders.filter((o) => o.status === id).length;
  };

  const getFileIcon = (file) => {
    const mimetype = file.mimetype || "";
    if (mimetype.startsWith("image/")) return <Image size={14} />;
    return <FileText size={14} />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = (file) => {
    const fileUrl = file.path
      ? `http://localhost:4000/${file.path}`
      : `http://localhost:4000/uploads/${file.filename}`;
    window.open(fileUrl, "_blank");
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen z-50 transition-all duration-300 border-l border-white/10 bg-gradient-to-b from-[#07111C] to-[#0A1525] ${
        opened ? "w-[420px]" : "w-[70px]"
      }`}
    >
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-[#07111C]/50 backdrop-blur-sm">
        {opened && (
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-yellow-400/10">
              <ClipboardList size={18} className="text-yellow-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">Замовлення</h2>
              <p className="text-gray-500 text-[10px]">
                Всього: {orders.length}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpened(!opened)}
          className="cursor-pointer text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
        >
          {opened ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {opened && (
        <div className="h-[calc(100vh-64px)] flex flex-col relative">
          {/* Search & Refresh */}
          <div className="p-3 border-b border-white/10 bg-[#07111C]/30">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Пошук за ім'ям, телефоном або послугою..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 bg-black/50 border border-white/10 rounded-lg text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-3 pb-24 space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw
                  size={32}
                  className="text-yellow-400 animate-spin mb-3"
                />
                <p className="text-gray-400 text-sm">Завантаження...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <ShoppingBag size={48} className="text-gray-600 mb-3" />
                <p className="text-gray-500 text-sm">Немає замовлень</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-yellow-400 text-xs hover:underline"
                  >
                    Очистити пошук
                  </button>
                )}
              </div>
            ) : (
              filteredOrders.map((order) => {
                const current = getStatusData(order.status);
                const hasFiles = order.files && order.files.length > 0;
                const isExpanded = expandedOrder === order._id;

                return (
                  <div
                    key={order._id}
                    className={`group bg-gradient-to-br from-white/5 to-white/0 border rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${current.borderColor} border-opacity-30`}
                  >
                    {/* Header with date */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                          <User size={14} className="text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {order.name || "Без імені"}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Phone size={10} />
                            <span>{order.phone || "No phone"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${current.color}`}
                        >
                          {current.icon}
                          {current.label}
                        </div>
                        {order.createdAt && (
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                            <Calendar size={8} />
                            {formatDate(order.createdAt)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    {order.service && (
                      <div className="flex items-center gap-2 mb-3 p-2 bg-yellow-400/5 rounded-lg">
                        <Package size={12} className="text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-medium">
                          {order.service}
                        </span>
                      </div>
                    )}

                    {/* Comment */}
                    {order.comment && (
                      <div className="mb-3 flex gap-2">
                        <MessageSquare
                          size={12}
                          className="text-gray-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {order.comment}
                        </p>
                      </div>
                    )}

                    {/* Files */}
                    {hasFiles && (
                      <div className="mb-3">
                        <button
                          onClick={() => toggleExpand(order._id)}
                          className="flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 transition px-2 py-1 rounded-lg bg-yellow-400/5 hover:bg-yellow-400/10"
                        >
                          {isExpanded ? (
                            <EyeOff size={12} />
                          ) : (
                            <Eye size={12} />
                          )}
                          {isExpanded
                            ? "Сховати файли"
                            : `Файли (${order.files.length})`}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto">
                            {order.files.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-black/40 p-2 rounded-lg text-xs hover:bg-black/60 transition"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {getFileIcon(file)}
                                  <span className="text-white truncate">
                                    {file.originalName || file.filename}
                                  </span>
                                  <span className="text-gray-500 text-[10px] flex-shrink-0">
                                    {formatFileSize(file.size)}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleDownload(file)}
                                  className="text-yellow-400 hover:text-yellow-300 ml-2 p-1 rounded hover:bg-yellow-400/10 transition"
                                  title="Завантажити"
                                >
                                  <Download size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Status Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                      {statuses.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => updateStatus(order._id, s.value)}
                          className={`cursor-pointer text-xs rounded-lg py-2 transition-all duration-200 ${
                            order.status === s.value
                              ? `${s.color} border ${s.borderColor} font-medium`
                              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:scale-105"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-[#07111C]/95 backdrop-blur-sm">
            <div className="grid grid-cols-5 gap-1.5">
              {lists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => setActiveList(list.id)}
                  className={`relative flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] transition-all duration-200 ${
                    activeList === list.id
                      ? `bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 ${list.color}`
                      : "bg-white/5 text-gray-500 hover:bg-white/10"
                  }`}
                >
                  {list.icon}
                  <span className="font-medium">{list.label}</span>
                  <span
                    className={`text-xs font-bold ${
                      activeList === list.id ? list.color : "text-gray-400"
                    }`}
                  >
                    {getListCount(list.id)}
                  </span>
                  {activeList === list.id && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
