import IDto from "../../abstract/iDto";

// این DTO برای نمایش اطلاعات کاربر و محصول در کنار سفارش است
interface UserInfo {
    id: string;
    username: string;
    firstName: string;
}

interface ProductInfo {
    id: string;
    name: string;
}

// برای جلوگیری از تداخل، این اینترفیس دیگر از OrderDto ارث‌بری نمی‌کند
export default interface AdminOrderDto extends IDto {
    id?: string;
    name: string;
    payed: boolean;
    price: number;
    finalPrice: number;
    product: ProductInfo; // نوع داده محصول به صورت آبجکت است
    user: UserInfo;
    createdAt: Date;
}