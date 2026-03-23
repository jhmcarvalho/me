import useSWR from "swr";
import { motion } from "framer-motion";

const BitcoinCard = ({ section }: { section?: string }) => {
    const { data, isLoading } = useSWR("/api/bitcoin", (url) =>
        fetch(url).then((res) => res.json()),
        { refreshInterval: 30000, revalidateOnFocus: true }
    );

    const formattedPrice = data?.price
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(data.price)
        : null;

    return (
        <motion.div
            animate={{
                opacity: section && ["all", "about"].includes(section) ? 1 : 0.3,
            }}
            whileHover="groupHover"
            variants={{
                groupHover: {
                    scale: 1.02,
                    transition: { duration: 0.1, ease: "easeInOut" },
                },
            }}
            className="bg-white dark:bg-gray-900 rounded-3xl custom-card shadow-sm overflow-hidden"
        >
            <div className="flex items-center justify-between h-full px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#F7931A]/10 dark:bg-[#F7931A]/15 p-2.5 rounded-2xl">
                        <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"
                                fill="#F7931A"
                            />
                            <path
                                d="M22.734 13.71c.302-2.019-1.236-3.104-3.34-3.83l.682-2.733-1.664-.415-.664 2.662a67.1 67.1 0 00-1.33-.313l.67-2.68-1.663-.414-.683 2.732c-.366-.083-.726-.166-1.075-.253l.002-.008-2.295-.573-.442 1.776s1.236.283 1.21.301c.675.168.797.615.776 .969l-.778 3.12c.046.012.107.029.173.055l-.176-.044-1.09 4.37c-.083.205-.291.513-.762.396.017.024-1.21-.302-1.21-.302l-.827 1.904 2.165.54c.403.1.797.205 1.186.305l-.69 2.765 1.662.415.683-2.735c.44.12.866.23 1.283.334l-.681 2.72 1.663.415.69-2.759c2.844.539 4.982.321 5.88-2.252.726-2.07-.036-3.263-1.531-4.043 1.089-.251 1.909-.969 2.128-2.45zm-3.808 5.34c-.515 2.07-4.003.951-5.134.67l.916-3.67c1.131.283 4.756.842 4.218 3zm.515-5.374c-.47 1.883-3.37.926-4.312.692l.831-3.33c.942.234 3.977.671 3.481 2.638z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Bitcoin
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">
                            BTC/USDT
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    {isLoading || !formattedPrice ? (
                        <div className="h-7 w-28 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                    ) : (
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                            {formattedPrice}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BitcoinCard;
