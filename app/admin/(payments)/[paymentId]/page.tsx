"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApiDeletePayment,
  ApiGetPayment,
  ApiUpdatePayment,
} from "@/services/paymentsService";
import { PaymentReq, PaymentType } from "@/types/paymentServiceTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { paymentId: string } }) {
  const { paymentId } = params;
  const router = useRouter();

  const [paymentData, setPaymentData] = useState<PaymentType | null>(null);
  const [loading, setLoading] = useState(true);

  const [paymentDataTemp, setPaymentDataTemp] = useState<PaymentReq | null>(
    null
  );

  const UpdatePayment = async () => {
    await ApiUpdatePayment(paymentId, paymentDataTemp).then((res) => {
      toast.success("Ödeme bilgileri güncellendi");
      router.push("/admin");
    });
  };

  const DeletePayment = async () => {
    await ApiDeletePayment(paymentId).then((res) => {
      toast.success("Ödeme bilgileri silindi");
      router.push("/admin");
    });
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const data = await ApiGetPayment(paymentId);
        setPaymentData(data);
        setPaymentDataTemp({
          appointment: data.appointment._id,
          amount: data.amount,
          method: data.method,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching payment data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!paymentData) {
    return <div>Payment not found</div>;
  }

  return (
    <div>
      <div className="flex gap-2 items-end flex-wrap mb-4">
        <h1 className="text-2xl font-semibold">Ödeme Bilgileri</h1>
        <p className="text-zinc-500 text-sm">ID: {paymentId}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-zinc-500 text-sm ml-2 mb-1">Method:</p>
          <Select
            value={paymentDataTemp?.method}
            onValueChange={(e: any) => {
              setPaymentDataTemp({
                ...paymentDataTemp,
                method: e,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Kredi Kartı</SelectItem>
              <SelectItem value="cash">Nakit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-zinc-500 text-sm ml-2 mb-1">Durum:</p>
          <Select
            value={paymentDataTemp?.status}
            onValueChange={(e: any) => {
              setPaymentDataTemp({
                ...paymentDataTemp,
                status: e,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Ödendi</SelectItem>
              <SelectItem value="pending">Bekleniyor</SelectItem>
              <SelectItem value="failed">İptal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-zinc-500 text-sm ml-2 mb-1">Tutar:</p>
          <Input
            type="number"
            value={paymentDataTemp?.amount}
            onChange={(e) => {
              setPaymentDataTemp({
                ...paymentDataTemp,
                amount: Number(e.target.value),
              });
            }}
            className="w-full border border-zinc-200 rounded-md p-2"
          />
        </div>
        <Button className="mt-4" onClick={UpdatePayment}>
          Kaydet
        </Button>
        <AlertDialog>
          <AlertDialogTrigger className="rounded-md p-2 border border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white transition-colors">
            Sil
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Emin misin?</AlertDialogTitle>
              <AlertDialogDescription>
                Bu işlem geri alınamaz devam etmek istediğine emin misin?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction onClick={DeletePayment}>
                Evet
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
