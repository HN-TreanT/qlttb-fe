import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layouts from "../layouts/Layout";
import NotFound from "../pages/not-found/NotFound";
import { RouterLinks } from "../const/RouterLinks";
import DanhSachCanBo from "../pages/quanlycanbo/danhsachcanbo/DanhSachCanBo";
import LichLamViec from "../pages/quanlycanbo/lichlamviec/LichLamViec";
import TrangThietBi from "../pages/quanlytrangthietbi/trangthietbij/TrangThietBi";
import LoaiTTB from "../pages/quanlytrangthietbi/LoaiTTB/LoaiTTB";
import TinhTrangTTB from "../pages/quanlytrangthietbi/TinhTrangTTB/TinhTrangTTB";
import LichSuSuDung from "../pages/quanlymuontra/LichSuSuDung/LichSuSuDung";
import LichHocTap from "../pages/quanlymuontra/LichHocTap/LichHocTap";
import MuonTra from "../pages/quanlymuontra/MuonTra/MuonTra";
import LichBaoDuong from "../pages/quanlybaoduong/lichbaoduong/LichBaoDuong";
import ChatLuong from "../pages/quanlybaoduong/chatluongbaoduong/ChatLuong";
import PhongHoc from "../pages/quanlymuontra/PhongHoc/PhongHoc";
export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: RouterLinks.CAN_BO,
        element: <DanhSachCanBo />,
      },
      {
        path: RouterLinks.LICH_LAM_VIEC,
        element: <LichLamViec />,
      },
      {
        path: RouterLinks.TRANG_THIET_BI,
        element: <TrangThietBi />,
      },
      {
        path: RouterLinks.LOAI_TTB,
        element: <LoaiTTB />,
      },
      {
        path: RouterLinks.TINH_TRANG_TTB,
        element: <TinhTrangTTB />,
      },
      {
        path: RouterLinks.LS_SU_DUNG_TTB,
        element: <LichSuSuDung />,
      },
      {
        path: RouterLinks.LICH_HOC_TAP,
        element: <LichHocTap />,
      },
      {
        path: RouterLinks.MUON_TRA,
        element: <MuonTra />,
      },
      {
        path: RouterLinks.LICH_BAO_DUONG,
        element: <LichBaoDuong />,
      },
      {
        path: RouterLinks.CHAT_LUONG,
        element: <ChatLuong />,
      },
      {
        path: RouterLinks.PHONG_HOC,
        element: <PhongHoc />,
      },
    ],
  },
]);
