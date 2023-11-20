import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import './App.css';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { router } from './routes';
import { RouterLinks } from './const/RouterLinks';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DanhSachCanBo from './pages/quanlycanbo/danhsachcanbo/DanhSachCanBo';
import LichLamViec from './pages/quanlycanbo/lichlamviec/LichLamViec';
import TrangThietBi from './pages/quanlytrangthietbi/trangthietbij/TrangThietBi';
import LoaiTTB from './pages/quanlytrangthietbi/LoaiTTB/LoaiTTB';
import TinhTrangTTB from './pages/quanlytrangthietbi/TinhTrangTTB/TinhTrangTTB';
import LichSuSuDung from './pages/quanlymuontra/LichSuSuDung/LichSuSuDung';
import LichHocTap from './pages/quanlymuontra/LichHocTap/LichHocTap';
import MuonTra from './pages/quanlymuontra/MuonTra/MuonTra';
import LichBaoDuong from './pages/quanlybaoduong/lichbaoduong/LichBaoDuong';
import ChatLuong from './pages/quanlybaoduong/chatluongbaoduong/ChatLuong';
import DanhSachLop from './pages/quanlymuontra/DanhSachLop/DanhSachLop';
import DanhSachPhong from './pages/quanlymuontra/DanhSachPhong/DanhSachPhong';

import Layout from './layouts/Layout';
function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
               <div className='MainApp'>

                  <div className='ContentApp'>
                     <Routes>
                        <Route path={RouterLinks.LOGIN} element={<Login />} />
                        <Route path={RouterLinks.REGISTER} element={<Register />} />
                        <Route path={RouterLinks.HOME_PAGE} element={<Layout />}>
                           <Route path={RouterLinks.CAN_BO} element={<Suspense fallback={null}><DanhSachCanBo /></Suspense>} />
                           <Route path={RouterLinks.LICH_LAM_VIEC} element={<Suspense fallback={null}><LichLamViec /></Suspense>} />
                           <Route path={RouterLinks.TRANG_THIET_BI} element={<Suspense fallback={null}><TrangThietBi /></Suspense>} />
                           <Route path={RouterLinks.LOAI_TTB} element={<Suspense fallback={null}><LoaiTTB /></Suspense>} />
                           <Route path={RouterLinks.TINH_TRANG_TTB} element={<Suspense fallback={null}><TinhTrangTTB /></Suspense>} />
                           <Route path={RouterLinks.LS_SU_DUNG_TTB} element={<Suspense fallback={null}><LichSuSuDung /></Suspense>} />
                           <Route path={RouterLinks.LICH_HOC_TAP} element={<Suspense fallback={null}><LichHocTap /></Suspense>} />
                           <Route path={RouterLinks.MUON_TRA} element={<Suspense fallback={null}><MuonTra /></Suspense>} />
                           <Route path={RouterLinks.LICH_BAO_DUONG} element={<Suspense fallback={null}><LichBaoDuong /></Suspense>} />
                           <Route path={RouterLinks.CHAT_LUONG} element={<Suspense fallback={null}><ChatLuong /></Suspense>} />
                           <Route path={RouterLinks.DANH_SACH_LOP} element={<Suspense fallback={null}><DanhSachLop /></Suspense>} />
                           <Route path={RouterLinks.DANH_SACH_PHONG} element={<Suspense fallback={null}><DanhSachPhong /></Suspense>} />
                           <Route path={RouterLinks.LICH_HOC_TAP} element={<Suspense fallback={null}><LichHocTap /></Suspense>} />

                        </Route>

                     </Routes>

                  </div>
               </div>
            </PersistGate>
         </BrowserRouter>

      </Provider>
   );
}

export default App;
