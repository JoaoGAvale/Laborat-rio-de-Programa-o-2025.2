'use client';

import React from "react";
import { TbCloverFilled } from "react-icons/tb"; // Close
import { GoAlertFill } from "react-icons/go"; // Erro 
import { FaRegCircleCheck } from "react-icons/fa6"; // Sucesso

const UserAlert = ({
    isError,
    topMessage,
    bottomMessage,
    isVisible,
    onClose,
}) =>{

    const borderColor = isError ? "#E74C3C" : "#27AE60";
    const progressColor = isError ? "#E74C3C" : "#27AE60";
    const imagem = isError ? <GoAlertFill style={{ color: "#E74C3C" , fontSize:36}}/> : <FaRegCircleCheck style={{ color: "#27AE60" , fontSize:36}}/>;

    return(
        isVisible && (
            <div style={{ borderColor }} className="fixed w-[100%] top-[60px] left-1/2 transform -translate-x-1/2 z-[3000] bg-[#333333] text-white p-3 rounded-lg border overflow-hidden shadow-md">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center font-poppins text-[16px]">
                        <div className="w-12 h-12 flex items-center justify-center mr-6 rounded-full">
                            {imagem}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-left font-bold leading-[18.4px] tracking-wide">
                                {topMessage}
                            </p>
                            {bottomMessage && (
                                <p className="text-left leading-[18.4px] tracking-wide font-72 m-0">
                                {bottomMessage}
                                </p>
                            )}
                        </div>
                    </div>
                    <TbCloverFilled
                    className="w-8 h-8 cursor-pointer slow-spin"
                    style={{ color: progressColor }}
                    onClick={() => {
                        onClose();
                    }}
                />
                </div>
                
            </div>
            
        )
    )
}

export default UserAlert;