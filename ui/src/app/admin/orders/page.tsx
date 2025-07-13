"use client";

import { useTranslations } from "next-intl";
import { Page } from "@/components/Page";
import { Toaster } from "react-hot-toast";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default function AdminOrdersPage() {
	const t = useTranslations("i18n");

	return (
		<Page back={true}>
			<Toaster position="top-right" reverseOrder={false} />
			<div className="container mx-auto px-4">
				<h1 className="text-xl font-bold my-4">{t("my-orders")}</h1>
				<p>در این بخش تمام سفارشات ثبت‌شده در سیستم قابل مشاهده است.</p>
				<OrdersTable />
			</div>
		</Page>
	);
}
