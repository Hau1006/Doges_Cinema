import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postBooking } from './bookingApi';
import { getSeatPlan } from './seatApi';

const initialState = {
    seatData: [],
    selectedIndex: [], //so ghe
    selectedName: [],

    maLichChieu: null,
    danhSachVe: [],
    taiKhoanNguoiDung: null,
    accessToken: null,

    status: '',

    modalSuccess: false,
    modalVisibleCountdown: false
};

export const postBookingAsync = createAsyncThunk(
    'module/postBooking',
    async (model) => {
       
        const res = await postBooking(model[0], model[1].accessToken).then(data => {
            return data;
        });
        // The value we return becomes the `fulfilled` action payload
        return res.data;
    }
)

export const getSeatPlanAsync = createAsyncThunk(
    'module/getSeatPlan',
    async (maLichChieu) => {
        const response = await getSeatPlan(maLichChieu).then(data => {
            return data;
        });
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const seatSlice = createSlice({
    name: 'seatPlan',
    initialState,
    reducers: {
        selected: (state, action) => {
            state.selectedIndex.push(action.payload);
        },
        unselect: (state, action) => {
            const index = state.selectedIndex.indexOf(action.payload);
            state.selectedIndex.splice(index, 1);
        },
        selectedName: (state, action) => {
            state.selectedName.push(action.payload);
        },
        unselectName: (state, action) => {
            const index = state.selectedName.indexOf(action.payload);
            state.selectedName.splice(index, 1);
        },
        updateBookingData: (state, action) => {
            state.maLichChieu = parseInt(action.payload.maLichChieu);
            state.taiKhoanNguoiDung = action.payload.taiKhoanNguoiDung;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        updateDanhSachVe: (state) => {
            state.seatData.danhSachGhe.forEach(element => {
                if (state.selectedIndex.includes(element.stt)) {
                    state.danhSachVe.push({ maGhe: element.maGhe, giaVe: element.giaVe });
                }
            });
        },
        timesUp: (state) => {
            state.modalVisibleCountdown = true;
        },
        reset: state => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSeatPlanAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSeatPlanAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.seatData = action.payload;
            })
            .addCase(postBookingAsync.pending, (state, action) => {
                //console.log('fail');
            })
            .addCase(postBookingAsync.fulfilled, (state, action) => {
                //console.log('done');
                state.modalSuccess = true;
                state.danhSachVe = [];
            });
    },
});

// create action
export const { selected, unselect, selectedName, unselectName, updateBookingData, updateAccessToken, updateDanhSachVe, timesUp, reset } = seatSlice.actions;

// selector
export const getMovieInfo = (state) => state.seatPlan.seatData.thongTinPhim;
export const getSeatList = (state) => state.seatPlan.seatData.danhSachGhe;
export const getSelectedIndex = (state) => state.seatPlan.selectedIndex;
export const getSelectedName = (state) => state.seatPlan.selectedName;
export const getAll = (state) => state.seatPlan.seatData;

export const getModel = (state) => {
    return [{
        malichChieu: state.seatPlan.maLichChieu,
        danhSachVe: state.seatPlan.danhSachVe,
        taiKhoanNguoiDung: state.seatPlan.taiKhoanNguoiDung
    }, {
        accessToken: state.seatPlan.accessToken
    }]
};
export const getModalVisible = state => state.seatPlan.modalSuccess;
export const getModalVisibleCountdown = state => state.seatPlan.modalVisibleCountdown;

export default seatSlice.reducer;