import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";

const PriceBreakout = ({ open, onClose, data }) => {
    const [priceDetails, setPriceDetails] = useState(null);

    const calculatePaymentDetails = (data) => {
        // Use the provided data for calculations
        const metalBaseAmount = parseFloat((parseFloat(data.metal_calculation.base_amount, 2) - parseFloat(data.metal_calculation.mc, 2)).toFixed(2));
        const stoneBaseAmount = parseFloat(data.stone_calculation.base_amount, 2)
        // Get making charge amount
        const metalMakingChargeAmount = parseFloat(data.metal_calculation.mc, 2);
        const metalTotalAmount = parseFloat(metalBaseAmount, 2) + parseFloat(metalMakingChargeAmount, 2);
        // Calculate GST for metal
        const metalGst = parseFloat((metalTotalAmount * (parseFloat(data.metal_calculation.gst_perc) / 100)).toFixed(2));
        const metalNetAmount = parseFloat((metalTotalAmount + metalGst).toFixed(2));

        // Calculate GST for stone
        const stoneGst = parseFloat((stoneBaseAmount * (parseFloat(data.stone_calculation.gst_perc) / 100)).toFixed(2));
        const stoneNetAmount = parseFloat((stoneBaseAmount + stoneGst).toFixed(2));

        const adminCommission = data.admin_commission_perc;

        // Calculate subtotal from metal and stone base amounts
        const subTotal = parseFloat((metalNetAmount + stoneNetAmount).toFixed(2));

        let totalAmount = subTotal;

        // Assuming 5% tax
        const taxRate = 5;
        const taxAmount = parseFloat((totalAmount * 0.05).toFixed(2));
        const tdsAmount = parseFloat((totalAmount * 0.01).toFixed(2));
        const commission = parseFloat((totalAmount * adminCommission * 0.01).toFixed(2));

        const tcs = parseFloat((totalAmount - commission - tdsAmount) * 0.01).toFixed(2);
        const totalAmountAfterDeduction = parseFloat((totalAmount - commission - tdsAmount - tcs - taxAmount).toFixed(2));

        return {
            taxRate: taxRate,
            taxAmount: taxAmount,
            subTotal: totalAmount,
            totalDiscount: 0, // No discount logic
            totalAmount: Math.round(totalAmount),
            subTotalAmount: Math.round(subTotal),
            tdsAmount: tdsAmount,
            commission: commission,
            tcs: tcs,
            totalAmountAfterDeduction: totalAmountAfterDeduction,
            metal_calculation: {
                base_amount: metalBaseAmount,
                gst_perc: data.metal_calculation.gst_perc,
                making_charge_amount: data.metal_calculation.mc,
                net_amount: metalNetAmount,
                gst_amount: metalGst,
            },
            stone_calculation: {
                base_amount: stoneBaseAmount,
                gst_perc: data.stone_calculation.gst_perc,
                making_charge_amount: data.stone_calculation.mc,
                net_amount: stoneNetAmount,
                gst_amount: stoneGst,
            }
        };
    };

    useEffect(() => {
        if (open) {
            const result = calculatePaymentDetails(data);
            console.log('result', result);
            setPriceDetails(result);
        }
    }, [open, data]);

    return (
        <Dialog open={open} onClose={onClose} sx={{ width: '100%', overflow: 'hidden' }} maxWidth='md' fullWidth>
            <DialogTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>Price Breakout</span> <Button onClick={onClose}>
            <CloseIcon style={{ fontSize: "2rem", color: "#A36E29" }} />
            </Button></DialogTitle>
            <Divider sx={{marginLeft: '1.5rem', marginRight: '1.5rem' }} />
            <DialogContent sx={{ width: '100%' }}>
                {priceDetails ? (
                    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Metal Calculation</h2>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Base Amount:</span> {!isNaN(priceDetails.metal_calculation.base_amount) ? priceDetails.metal_calculation.base_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Making Charge Amount:</span> {!isNaN(priceDetails.metal_calculation.making_charge_amount) ? priceDetails.metal_calculation.making_charge_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Percentage:</span> {!isNaN(priceDetails.metal_calculation.gst_perc) ? priceDetails.metal_calculation.gst_perc : 0}%</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Amount:</span> {!isNaN(priceDetails.metal_calculation.gst_amount) ? priceDetails.metal_calculation.gst_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Net Amount:</span> {!isNaN(priceDetails.metal_calculation.net_amount) ? priceDetails.metal_calculation.net_amount : 0}</p>
                            </div>
                            <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Stone Calculation</h2>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Base Amount:</span> {!isNaN(priceDetails.stone_calculation.base_amount) ? priceDetails.stone_calculation.base_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Percentage:</span> {!isNaN(priceDetails.stone_calculation.gst_perc) ? priceDetails.stone_calculation.gst_perc : 0}%</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>GST Amount:</span> {!isNaN(priceDetails.stone_calculation.gst_amount) ? priceDetails.stone_calculation.gst_amount : 0}</p>
                                <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Net Amount:</span> {!isNaN(priceDetails.stone_calculation.net_amount) ? priceDetails.stone_calculation.net_amount : 0}</p>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ border: '1px solid #ccc', padding: '10px', width: '100%' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Total</h2>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Subtotal:</span> {!isNaN(priceDetails.subTotal) ? priceDetails.subTotal : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Tax Rate:</span> {!isNaN(priceDetails.taxRate) ? priceDetails.taxRate : 0}%</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Tax Amount:</span> {!isNaN(priceDetails.taxAmount) ? priceDetails.taxAmount : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>TDS Amount:</span> {!isNaN(priceDetails.tdsAmount) ? priceDetails.tdsAmount : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Commission:</span> {!isNaN(priceDetails.commission) ? priceDetails.commission : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>TCS:</span> {!isNaN(priceDetails.tcs) ? priceDetails.tcs : 0}</p>
                            <p style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><span style={{ marginRight: '10px' }}>Settlement Amount:</span> {!isNaN(priceDetails.totalAmountAfterDeduction) ? priceDetails.totalAmountAfterDeduction : 0}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default PriceBreakout;