'use client'
import ExampleModal from '@/app/modal/example';
import Fail from '@/app/modal/fail';
import LanguageModal from '@/app/modal/language-modal';
import LoginWarnModal from '@/app/modal/login-warn';
import LogoutModal from '@/app/modal/logout-modal';

import Success from '@/app/modal/success';
import SuccessPay from '@/app/modal/success-pay';
import TicketInfo from '@/app/modal/ticket-info';
import React, { createContext, useState } from 'react';

/**
 * @typedef {Object} PopupState
 * @property {boolean} loginModal
 * @property {boolean} signUpModal
 * @property {boolean} forgotPasswordModal
 */

/**
 * @typedef {Object} PopupContextType
 * @property {PopupState} popup
 * @property {React.Dispatch<React.SetStateAction<PopupState>>} setPopup
 * @property {(modalName: keyof PopupState) => void} openModal
 * @property {(title: string, description: string, buttonText: string, buttonOnClick: () => void, outsideOnClick: () => void) => void} openSuccessModal
 * @property {(title: string, description: string, buttonText: string, buttonOnClick: () => void) => void} openFailModal
 * @property {() => void} closeAllModal
 */

/**
 * @type {React.Context<PopupContextType | undefined>}
 */
export const PopupContext = createContext();

/**
 * Provider component for managing popup modals
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.ReactElement}
 */

export const modalList = {
    example: {
        key: 'exampleModal',
        modal: ExampleModal,
    },
    language: {
        key: 'languageModal',
        modal: LanguageModal,
    },
    loginWarn: {
        key: 'loginWarn',
        modal: LoginWarnModal,
    },
    ticketInfo: {
        key: 'ticketInfo',
        modal: TicketInfo,
    },
    successPay: {
        key: 'successPay',
        modal: SuccessPay,
    },
    logout: {
        key: 'logoutModal',
        modal: LogoutModal,
    }
};


export const PopUpProvider = ({ children }) => {
    // loop thru modalList and use modal name to create initial state of modal open/close = {modalName:boolean}
    const CustomPopup = Object.values(modalList).reduce((acc, { key }) => {
        acc[key] = false;
        return acc;
    }, {});

    // hardcoded success and fail modals
    const initState = {
        ...CustomPopup,
        successModal: false,
        failModal: false,
    }
    const [popup, setPopup] = useState(initState);
    const [modalData, setModalData] = useState({});
    const [successModalData, setSuccessModalData] = useState({ title: '', description: '', buttonText: '', buttonOnClick: () => { }, outsideOnClick: () => { } });
    const [failModalData, setFailModalData] = useState({ title: '', description: '', buttonText: '', buttonOnClick: () => { } });

    const openModal = (modalName, data) => {
        console.log("open modal:", modalName);
        // only one modal open at a time
        setPopup((prev) => ({
            ...initState,
            [modalName]: true,
        }));
        // store modal data if provided
        if (data) {
            setModalData(data);
        }
    }

    const openSuccessModal = ({ title, description, buttonText, buttonOnClick, outsideOnClick }) => {
        setSuccessModalData({ title, description, buttonText, buttonOnClick, outsideOnClick });
        setPopup((prev) => ({
            ...initState,
            successModal: true,
        }));
    };

    const openFailModal = ({ title, description, buttonText, buttonOnClick }) => {
        setFailModalData({ title, description, buttonText, buttonOnClick });
        setPopup((prev) => ({
            ...initState,
            failModal: true,
        }));
    };



    const closeAllModal = () => {
        console.log("close all modals");
        setPopup(initState);
        setModalData({});
    }



    const contextValue = {
        popup,
        setPopup,
        openModal,
        closeAllModal,
        openSuccessModal,
        openFailModal,
    };

    return (
        <PopupContext.Provider value={contextValue}>
            <Success open={popup.successModal} title={successModalData.title} description={successModalData.description} buttonText={successModalData.buttonText} buttonOnClick={successModalData.buttonOnClick} outsideOnClick={successModalData.outsideOnClick} />
            <Fail open={popup.failModal} title={failModalData.title} description={failModalData.description} buttonText={failModalData.buttonText} buttonOnClick={failModalData.buttonOnClick} />
            {
                Object.values(modalList).map(({ key, modal: Component }) => (
                    <Component key={key} open={popup[key]} data={modalData} />
                ))
            }

            {children}
        </PopupContext.Provider>
    );
}