"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { generateCsrfToken } from "@/lib/utils/csrf.helper";
import { getCookieCSRF } from "@/actions/auth.action";
import { getAllOrders } from "@/actions/order.action";
import { Pagination } from "../pagination/pagination";

interface UserInfo {
	id: string;
	username: string;
	firstName: string;
}

interface ProductInfo {
	id: string;
	name: string;
}

interface AdminOrder {
	id?: string;
	name: string;
	payed: boolean;
	price: number;
	finalPrice: number;
	product: ProductInfo;
	user: UserInfo;
	createdAt: string;
}

export const OrdersTable = () => {
	const t = useTranslations("i18n");
	const [orders, setOrders] = useState<AdminOrder[]>([]);
	const [loading, setLoading] = useState(true);
	const [totalOrders, setTotalOrders] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	useEffect(() => {
		const fetchOrders = async () => {
			setLoading(true);
			try {
				const csrf = generateCsrfToken((await getCookieCSRF()) ?? "");
				const result = JSON.parse(
					await getAllOrders({
						csrf,
						startIndex: (currentPage - 1) * pageSize,
						limit: pageSize,
						order: -1,
					})
				);

				if (result.success) {
					setOrders(result.data.items);
					setTotalOrders(result.data.length);
				} else {
					toast.error(
						t("list-unsuccessfully") + `: ${result.message}`
					);
				}
			} catch (err) {
				toast.error(t("list-unsuccessfully"));
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [currentPage, t]);

	if (loading) return <p>{t("loading")}...</p>;

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							{t("product-name")}
						</th>
						<th scope="col" className="px-6 py-3">
							{t("user")}
						</th>
						<th scope="col" className="px-6 py-3">
							{t("product-price")}
						</th>
						<th scope="col" className="px-6 py-3">
							وضعیت پرداخت
						</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr
							key={order.id}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{order.product.name}
							</th>
							<td className="px-6 py-4">
								{order.user.username || order.user.firstName}
							</td>
							<td className="px-6 py-4">
								{order.finalPrice} {t("toman")}
							</td>
							<td className="px-6 py-4">
								{order.payed ? "پرداخت شده" : "پرداخت نشده"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="p-4">
				<Pagination
					currentPageState={[currentPage, setCurrentPage]}
					pageCount={Math.ceil(totalOrders / pageSize)}
				/>
			</div>
		</div>
	);
};
