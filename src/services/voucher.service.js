import apiService from "./api.service";

class VoucherService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/vouchers');
    }

    async getVouchers(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách voucher:", error);
            throw error;
        }
    }

    async getVoucherById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin voucher:", error);
            throw error;
        }
    }

    async createVoucher(Voucher) {
        try {
            const response = await this.api.request("/", "POST", Voucher);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo voucher:", error);
            throw error;
        }
    }

    async updateVoucher(id, Voucher) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Voucher);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật voucher:", error);
            throw error;
        }
    }

    async deleteVoucher(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa voucher:", error);
            throw error;
        }
    }
}

export default new VoucherService;