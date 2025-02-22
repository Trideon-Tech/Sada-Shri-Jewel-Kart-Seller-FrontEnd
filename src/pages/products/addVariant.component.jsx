import Grid from "@mui/system/Unstable_Grid";
import { FormControl, Select, MenuItem, TextField, InputAdornment, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import PriceBreakout from "./priceBreakout.component";
import CloseIcon from "@mui/icons-material/Close";

const AddVariant = (props) => {
    // Initialize state for each prop
    const [variantName, setVariantName] = useState("");
    const [metalType, setMetalType] = useState(props.metalType);
    const [purity, setPurity] = useState(props.purity);
    const [quantity, setQuantity] = useState(props.quantity);
    const [tag, setTag] = useState("");
    const [grossWeight, setGrossWeight] = useState(props.grossWeight);
    const [stoneWeight, setStoneWeight] = useState(props.stoneWeight);
    const [netWeight, setNetWeight] = useState(props.netWeight);
    const [wastagePercent, setWastagePercent] = useState(props.wastagePercent);
    const [wastageWeight, setWastageWeight] = useState(props.wastageWeight);
    const [netWeightAfterWastage, setNetWeightAfterWastage] = useState(props.netWeightAfterWastage || 0);
    const [makingChargeType, setMakingChargeType] = useState(props.makingChargeType);
    const [makingChargeValue, setMakingChargeValue] = useState(props.makingChargeValue);
    const [makingChargeAmount, setMakingChargeAmount] = useState(props.makingChargeAmount);
    const [stoneAmount, setStoneAmount] = useState(props.stoneAmount);
    const [hallmarkCharge, setHallmarkCharge] = useState(props.hallmarkCharge);
    const [rodiumCharge, setRodiumCharge] = useState(props.rodiumCharge);
    const [gstPercent, setGstPercent] = useState(props.gstPercent);
    const [stoneType, setStoneType] = useState(props.stoneType);
    const [stoneColor, setStoneColor] = useState(props.stoneColor);
    const [stoneClarity, setStoneClarity] = useState(props.stoneClarity);
    const [stoneCut, setStoneCut] = useState(props.stoneCut);
    const [stonePieces, setStonePieces] = useState(props.stonePieces);
    const [stoneCarat, setStoneCarat] = useState(props.stoneCarat);
    const [stoneInternalWeight, setStoneInternalWeight] = useState(props.stoneInternalWeight);
    const [stoneRate, setStoneRate] = useState(props.stoneRate);
    const [stoneGSTPercent, setStoneGSTPercent] = useState(props.stoneGSTPercent);
    const [rates, setRates] = useState(props.rates);
    const [rate, setRate] = useState(0)
    const [dropdownValues, setDropdownValues] = useState(props.dropdownValues);
    const [amount, setAmount] = useState(0);
    const [stoneTotalAmount, setStoneTotalAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [productAmountData, setProductAmountData] = useState({});
    const [qualityName, setQualityName] = useState();
    const [showPriceBreakout, setShowPriceBreakout] = useState(false);
    const [settlementAmount, setSettlementAmount] = useState(0);


    const calculateTotalPrice = (metalInfo, stoneInfo) => {
        const metal =
            typeof metalInfo === "string" ? JSON.parse(metalInfo) : metalInfo;
        const stone =
            typeof stoneInfo === "string" ? JSON.parse(stoneInfo) : stoneInfo;

        const metalRate = rates[metal.quality_name] || 0;
        // Calculate net weight
        const netWeight = parseFloat(metal.gross_wt) - parseFloat(metal.stone_wt);
        const wastageWeight = netWeight * (parseFloat(metal.wastage_prec) / 100);

        const netWeightAfterWastage = netWeight + wastageWeight;

        // Calculate metal base amount
        let metalBaseAmount = 0;

        if (metal.making_charge_type === "8") {
            metalBaseAmount = parseFloat(metal.making_charge_amount || 0);
        } else {
            metalBaseAmount = parseFloat(netWeightAfterWastage * metalRate);
            metalBaseAmount +=
                parseFloat(metal.making_charge_amount || 0) +
                parseFloat(metal.stone_amount || 0) +
                parseFloat(metal.hallmark_charge || 0) +
                parseFloat(metal.rodium_charge || 0);
        }

        // set making charge amount
        if (makingChargeType == 6) {
            setMakingChargeAmount(
                (
                    parseFloat(metal.making_charge_value) *
                    parseFloat(netWeightAfterWastage || 0)
                ).toFixed(2)
            );
        } else if (makingChargeType == 7 || makingChargeType == 8) {
            setMakingChargeAmount(
                parseFloat(metal.making_charge_value || 0).toFixed(2)
            );
        } else if (makingChargeType == 9) {
            setMakingChargeAmount(
                parseFloat(
                    isNaN(
                        metal.making_charge_value *
                        (rate / 100) *
                        (netWeightAfterWastage || netWeight || 0)
                    )
                        ? 0
                        : metal.making_charge_value *
                        (rate / 100) *
                        (netWeightAfterWastage || netWeight || 0)
                ).toFixed(2)
            );
        }

        // Calculate GST for metal
        const metalGst = metalBaseAmount * (parseFloat(metal.gst_perc) / 100);
        const metalNetAmount = metalBaseAmount + metalGst;

        // Stone calculations (already correct)
        const stoneWeight =
            parseFloat(stone.pieces) * parseFloat(stone.carat) * 0.2;
        const stoneBaseAmount = parseFloat(stone.stone_rate) * stone.carat;
        const stoneGst = isNaN(stoneBaseAmount * (parseFloat(stone.gst_perc) / 100))
            ? 0
            : stoneBaseAmount * (parseFloat(stone.gst_perc) / 100);
        const stoneNetAmount = stoneBaseAmount + stoneGst;

        // Total price
        const totalPrice = (amount || 0) + (stoneNetAmount || 0);

        const priceDetails = {
            total_price: totalPrice.toFixed(2),
            metal_calculation: {
                net_weight: netWeight,
                wastage_weight: wastageWeight,
                net_weight_after_wastage: netWeightAfterWastage,
                base_amount: metalBaseAmount,
                gst_amount: metalGst,
                net_amount: metalNetAmount,
                mc: makingChargeAmount,
                total_amount: metalNetAmount + stoneNetAmount,
                gst_perc: gstPercent
            },
            stone_calculation: {
                stone_weight: stoneWeight,
                base_amount: stoneBaseAmount,
                gst_amount: stoneGst,
                net_amount: stoneNetAmount,
                gst_perc: stoneGSTPercent,
                mc: makingChargeAmount,
                total_amount: stoneNetAmount + makingChargeAmount,
                wastage_weight: wastageWeight,
                wastage_prec: wastagePercent,
                net_weight_after_wastage: netWeightAfterWastage,
                net_weight: netWeight
            },
        };
        setProductAmountData(priceDetails);
        return priceDetails;
    };

    useEffect(() => {
        let selectedOption;
        if (metalType === "gold") {
            selectedOption = dropdownValues?.[0]?.customization_fields
                .find((field) => field.name === "gold_quality")
                ?.property_value.find((opt) => opt.name === purity)?.name;
        } else if (metalType === "silver") {
            selectedOption = dropdownValues?.[1]?.customization_fields
                .find((field) => field.name === "silver_quality")
                ?.property_value.find((opt) => opt.name === purity)?.name;
        }

        setPurity(selectedOption);

        if (selectedOption) {
            const rateKey = selectedOption === "silver22" ? "silver" : selectedOption;
            setRate(rates[rateKey] || 0);
        }
    }, [metalType, purity]);

    useEffect(() => {
        const metalInfo = {
            gross_wt: grossWeight,
            stone_wt: stoneWeight,
            wastage_prec: wastagePercent,
            making_charge_type: makingChargeType,
            making_charge_value: makingChargeValue,
            stone_amount: stoneAmount,
            hallmark_charge: hallmarkCharge,
            rodium_charge: rodiumCharge,
            gst_perc: gstPercent,
            quality: purity,
            quality_name: qualityName,
            making_charge_amount: makingChargeAmount,
        };

        const stoneInfo = {
            pieces: stonePieces,
            carat: stoneCarat,
            stone_rate: stoneRate,
            gst_perc: stoneGSTPercent,
        };

        setMakingChargeAmount(makingChargeAmount);

        const priceDetails = calculateTotalPrice(metalInfo, stoneInfo);
        setStoneTotalAmount(
            parseFloat(
                isNaN(priceDetails.stone_calculation.net_amount)
                    ? 0
                    : priceDetails.stone_calculation.net_amount
            )
        );
        setTotalAmount(
            parseFloat(isNaN(priceDetails.total_price) ? 0 : priceDetails.total_price)
        );
    }, [
        grossWeight,
        stoneWeight,
        wastagePercent,
        makingChargeType,
        makingChargeValue,
        stoneAmount,
        hallmarkCharge,
        rodiumCharge,
        gstPercent,
        purity,
        stonePieces,
        stoneCarat,
        stoneRate,
        stoneGSTPercent,
        netWeightAfterWastage,
        rate,
        makingChargeAmount,
    ]);

    useEffect(() => {
        let baseAmount = 0;

        if (makingChargeType == 8) {
            setAmount(parseFloat(makingChargeAmount || 0));
            return;
        }

        // Calculate base amount based on weight
        if (netWeightAfterWastage) {
            baseAmount = netWeightAfterWastage * rate;
        } else if (netWeight) {
            baseAmount = netWeight * rate;
        } else if (grossWeight) {
            baseAmount = grossWeight * rate;
        }

        // Add additional charges
        let totalAmount = baseAmount;
        if (makingChargeAmount) totalAmount += parseFloat(makingChargeAmount);
        if (hallmarkCharge) totalAmount += parseFloat(hallmarkCharge);
        if (rodiumCharge) totalAmount += parseFloat(rodiumCharge);
        if (stoneAmount) totalAmount += parseFloat(stoneAmount);

        // Add GST if present
        if (gstPercent) {
            totalAmount += (totalAmount * parseFloat(gstPercent)) / 100;
        }

        setAmount(totalAmount);
    }, [
        netWeightAfterWastage,
        netWeight,
        grossWeight,
        rate,
        makingChargeAmount,
        hallmarkCharge,
        rodiumCharge,
        stoneAmount,
        gstPercent,
        makingChargeType,
    ]);

    const handlePurityChange = (e) => {
        setPurity(e.target.value);
    };

    const handleMakingChargeValueChange = (e) => {
        const value = e.target.value;
        setMakingChargeValue(value);
        if (makingChargeType === 6) {
            setMakingChargeAmount(
                (parseFloat(value) * parseFloat(netWeightAfterWastage || 0)).toFixed(2)
            );
        } else if (makingChargeType === 7 || makingChargeType === 8) {
            setMakingChargeAmount(parseFloat(value || 0).toFixed(2));
        } else if (makingChargeType === 9) {
            setMakingChargeAmount(
                parseFloat(
                    value * (rate / 100) * (netWeightAfterWastage || netWeight || 0)
                ).toFixed(2)
            );
        }
    };

    const handleSettlementAmountChange = (value) => {
        setSettlementAmount(value);
    };

    const handleVariantChange = (updatedVariant) => {
        const variantData = {
            product_id: props.productId,
            action: "variant",
            name: updatedVariant.variantName,
            size: updatedVariant.size,
            hsn: updatedVariant.hsnCode || "",
            quantity: updatedVariant.quantity,
            tags: updatedVariant.tag,
            discount_perc: updatedVariant.discount_perc,
            metal: {
                metal: updatedVariant.metalType || "",
                quantity: updatedVariant.metalQuantity || 1,
                quality: updatedVariant.purity || "",
                gross_wt: updatedVariant.grossWeight || "",
                stone_wt: updatedVariant.stoneWeight || "",
                net_wt: updatedVariant.netWeight || "0",
                wastage_prec: updatedVariant.wastagePercent || "",
                wastage_wt: updatedVariant.wastageWeight || "0",
                net_wt_after_wastage: updatedVariant.netWeightAfterWastage || "",
                making_charge_type: updatedVariant.makingChargeType || 9,
                making_charge_value: updatedVariant.makingChargeValue || "0",
                making_charge_amount: updatedVariant.makingChargeAmount || "0.00",
                stone_amount: updatedVariant.stoneAmount || "0",
                hallmark_charge: updatedVariant.hallmarkCharge || "0",
                rodium_charge: updatedVariant.rodiumCharge || "0",
                gst_perc: updatedVariant.gstPercent || 0,
            },
            stone: {
                stone_type: updatedVariant.stoneType || "",
                color: updatedVariant.stoneColor || "",
                clarity: updatedVariant.stoneClarity || "",
                cut: updatedVariant.stoneCut || "0",
                pieces: updatedVariant.stonePieces || "0",
                carat: updatedVariant.stoneCarat || "0",
                stone_wt: updatedVariant.stoneWeight || "0",
                stone_rate: updatedVariant.stoneRate || "0",
                gst_perc: updatedVariant.stoneGSTPercent || "0",
            },
        };

        props.setVariants((prevVariants) => {
            return prevVariants.map((variant, index) =>
                index === props.variantIndex ? { ...variant, ...variantData } : variant
            );
        });
    };

    useEffect(() => {
        handleVariantChange({
            variantName,
            metalType,
            purity,
            quantity,
            tag,
            grossWeight,
            stoneWeight,
            netWeight,
            wastagePercent,
            wastageWeight,
            netWeightAfterWastage,
            makingChargeType,
            makingChargeValue,
            makingChargeAmount,
            stoneAmount,
            hallmarkCharge,
            rodiumCharge,
            gstPercent,
            stoneType,
            stoneColor,
            stoneClarity,
            stoneCut,
            stonePieces,
            stoneCarat,
            stoneInternalWeight,
            stoneRate,
            stoneGSTPercent,
            rates,
            rate,
            dropdownValues,
            amount,
            stoneTotalAmount,
            totalAmount,
            productAmountData,
            qualityName,
            settlementAmount,
        });
        console.log("useeffect add var", props.variants)
    }, [
        variantName,
        metalType,
        purity,
        quantity,
        tag,
        grossWeight,
        stoneWeight,
        netWeight,
        wastagePercent,
        wastageWeight,
        netWeightAfterWastage,
        makingChargeType,
        makingChargeValue,
        makingChargeAmount,
        stoneAmount,
        hallmarkCharge,
        rodiumCharge,
        gstPercent,
        stoneType,
        stoneColor,
        stoneClarity,
        stoneCut,
        stonePieces,
        stoneCarat,
        stoneInternalWeight,
        stoneRate,
        stoneGSTPercent,
        rates,
        rate,
        dropdownValues,
        amount,
        stoneTotalAmount,
        totalAmount,
        productAmountData,
        qualityName,
        settlementAmount,
    ]);

    return (<>
        <PriceBreakout handleSettlementAmountChange={handleSettlementAmountChange} open={showPriceBreakout} data={productAmountData} rates={rates} onClose={() => setShowPriceBreakout(false)} />

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="label">Variant Details {props.variantIndex + 1}</div>
                <IconButton
                    onClick={() => props.removeVariant(props.variantIndex)}
                    sx={{ position: 'absolute', right: 8, top: 8, color: 'black' }}
                >
                    <CloseIcon />
                </IconButton>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className="label">Variant Name</div>
                        <TextField
                            name="variantName"
                            value={variantName}
                            onChange={(e) => setVariantName(e.target.value)}
                            fullWidth
                            placeholder="Enter Variant Name"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div className="label">Tags</div>
                        <TextField
                            name="tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            fullWidth
                            placeholder="Enter Tag Name"
                        />
                    </Grid>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginLeft: "20rem"
                        }}
                    >


                        <div style={{ marginRight: "20px" }}>
                            <div>Metal Rate</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                {rate.toFixed(2)}
                            </div>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <div>Metal Amount</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                {amount.toFixed(2)}
                            </div>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <div>Stone Amount</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                {parseFloat(stoneTotalAmount).toFixed(2)}
                            </div>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <div>Total Amount</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                {parseFloat(totalAmount).toFixed(2)}
                            </div>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <div>Discount %</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                <TextField
                                    type="number"
                                    // value={discount}
                                    // onChange={(e) => setDiscount(e.target.value)}
                                    fullWidth
                                    placeholder="Enter discount"
                                    style={{ width: "100px" }}
                                    InputProps={{
                                        style: {
                                            padding: "4px",
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ marginRight: "20px" }}>
                            <div>Settlement Amount</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                {/* {parseFloat(settlementAmount).toFixed(2)} */}
                            </div>
                            <Typography
                                style={{
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: "0.9rem",
                                    color: "grey",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                                onClick={() => setShowPriceBreakout(true)}
                            >
                                Price Breakout
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <div className="label">Metal Details</div>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Type</div>
                <FormControl fullWidth>
                    <Select
                        name="metalType"
                        value={metalType}
                        onChange={(e) => {
                            setMetalType(e.target.value);
                            // setMakingChargeType(9);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.querySelector('input[name="purity"]')?.focus();
                            }
                        }}
                    >
                        <MenuItem value="gold">Gold</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Purity</div>
                <FormControl fullWidth>
                    <Select
                        name="purity"
                        value={purity}
                        onChange={handlePurityChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.querySelector('input[name="quantity"]')?.focus();
                            }
                        }}
                    >
                        {metalType === "gold" &&
                            props.dropdownValues?.[0]?.customization_fields
                                .find((field) => field.name === "gold_quality")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                        {metalType === "silver" &&
                            props.dropdownValues?.[1]?.customization_fields
                                .find((field) => field.name === "silver_quality")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.5} style={{ display: "none" }}>
                <div className="label" >Quantity</div>
                <FormControl fullWidth>
                    <TextField
                        name="quantity"
                        type="number"
                        value={quantity}
                        // onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        placeholder="Enter quantity"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="grossWeight"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Gross Weight</div>
                <FormControl fullWidth>
                    <TextField
                        name="grossWeight"
                        type="number"
                        value={grossWeight}
                        onChange={(e) => {
                            setGrossWeight(e.target.value);
                            setNetWeight(e.target.value - stoneWeight);
                            setNetWeightAfterWastage(
                                e.target.value - stoneWeight + wastageWeight
                            );
                        }}
                        fullWidth
                        placeholder="Enter gross weight"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneWeight"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Stone Weight</div>
                <FormControl fullWidth>
                    <TextField
                        name="stoneWeight"
                        type="number"
                        value={stoneWeight}
                        onChange={(e) => {
                            setStoneWeight(e.target.value);
                            setNetWeight(grossWeight - e.target.value);
                            setNetWeightAfterWastage(
                                grossWeight - e.target.value + wastageWeight
                            );
                        }}
                        fullWidth
                        placeholder="Enter stone weight"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="makingChargeType"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Net Weight</div>
                <FormControl fullWidth>
                    <TextField
                        name="netWeight"
                        type="number"
                        value={netWeight}
                        disabled
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="wastagePercent"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Wastage %</div>
                <FormControl fullWidth>
                    <TextField
                        name="wastagePercent"
                        type="number"
                        value={wastagePercent}
                        onChange={(e) => {
                            setWastagePercent(e.target.value);
                            setWastageWeight(
                                (grossWeight - stoneWeight) * (e.target.value / 100)
                            );
                            setNetWeightAfterWastage(
                                (grossWeight - stoneWeight) * (1 + e.target.value / 100)
                            );
                        }}
                        fullWidth
                        placeholder="Enter wastage percentage"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">%</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="wastageWeight"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Wastage Weight</div>
                <FormControl fullWidth>
                    <TextField
                        name="wastageWeight"
                        type="number"
                        value={wastageWeight}
                        disabled
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="netWeightAfterWastage"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Net New Wt.</div>
                <FormControl fullWidth>
                    <TextField
                        name="netWeightAfterWastage"
                        type="number"
                        value={netWeightAfterWastage.toFixed(2)}
                        disabled
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('select[name="makingChargeType"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">MC Type</div>
                <FormControl fullWidth>
                    <Select
                        name="makingChargeType"
                        value={makingChargeType}
                        onChange={(e) => {
                            // console.log(e.target.value);
                            setMakingChargeType(e.target.value);
                            setMakingChargeValue();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="makingChargeValue"]')
                                    ?.focus();
                            }
                        }}
                    >
                        {metalType === "gold" &&
                            props.dropdownValues?.[0]?.customization_fields
                                .find((field) => field.name === "making_charge_type")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                        {metalType === "silver" &&
                            props.dropdownValues?.[1]?.customization_fields
                                .find((field) => field.name === "making_charge_type")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">MC</div>
                <FormControl fullWidth>
                    <TextField
                        name="makingChargeValue"
                        type="number"
                        value={makingChargeValue}
                        onChange={handleMakingChargeValueChange}
                        fullWidth
                        placeholder="Enter making charge value"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {makingChargeType === 9 ? "%" : "₹"}
                                </InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="makingChargeAmount"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">MC Amt.</div>
                <FormControl fullWidth>
                    <TextField
                        name="makingChargeAmount"
                        type="number"
                        value={makingChargeAmount}
                        onChange={(e) => setMakingChargeAmount(e.target.value)}
                        fullWidth
                        placeholder="Enter making charge amount"
                        disabled
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">₹</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneAmount"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Stone Amt.</div>
                <FormControl fullWidth>
                    <TextField
                        name="stoneAmount"
                        type="number"
                        value={stoneAmount}
                        onChange={(e) => setStoneAmount(e.target.value)}
                        fullWidth
                        placeholder="Enter stone amount"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">₹</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="hallmarkCharge"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Hallmark Amt.</div>
                <FormControl fullWidth>
                    <TextField
                        name="hallmarkCharge"
                        type="number"
                        value={hallmarkCharge}
                        onChange={(e) => setHallmarkCharge(e.target.value)}
                        fullWidth
                        placeholder="Enter hallmark charge"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">₹</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="rodiumCharge"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">Rodium|Cert. Cg.</div>
                <FormControl fullWidth>
                    <TextField
                        name="rodiumCharge"
                        type="number"
                        value={rodiumCharge}
                        onChange={(e) => setRodiumCharge(e.target.value)}
                        fullWidth
                        placeholder="Enter rodium charge"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">₹</InputAdornment>
                            ),
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('select[name="gstPercent"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.5}>
                <div className="label">GST</div>
                <FormControl fullWidth>
                    <Select
                        name="gstPercent"
                        value={gstPercent}
                        onChange={(e) => {
                            setGstPercent(e.target.value);
                        }}
                        fullWidth
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "gst")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <div className="label">Stone Details</div>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Type</div>
                <FormControl fullWidth>
                    <Select
                        name="stoneType"
                        value={stoneType}
                        onChange={(e) => setStoneType(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneClass"]')
                                    ?.focus();
                            }
                        }}
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "stone_type")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Color</div>
                <FormControl fullWidth>
                    <Select
                        name="stoneColor"
                        value={stoneColor}
                        onChange={(e) => setStoneColor(e.target.value)}
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "color")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Clarity</div>
                <FormControl fullWidth>
                    <Select
                        name="stoneClarity"
                        value={stoneClarity}
                        onChange={(e) => setStoneClarity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.querySelector('input[name="stoneCut"]')?.focus();
                            }
                        }}
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "clarity")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Cut</div>
                <FormControl fullWidth>
                    <Select
                        name="stoneCut"
                        value={stoneCut}
                        onChange={(e) => setStoneCut(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stonePieces"]')
                                    ?.focus();
                            }
                        }}
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "cut")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Pieces</div>
                <FormControl fullWidth>
                    <TextField
                        name="stonePieces"
                        type="number"
                        value={stonePieces}
                        onChange={(e) => {
                            setStonePieces(e.target.value);
                            const weight =
                                e.target.value && stoneCarat
                                    ? (stoneCarat * 0.2 * e.target.value).toFixed(2)
                                    : "";
                            setStoneInternalWeight(weight);
                        }}
                        fullWidth
                        placeholder="Enter number of pieces"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneCarat"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Carat</div>
                <FormControl fullWidth>
                    <TextField
                        name="stoneCarat"
                        type="number"
                        value={stoneCarat}
                        onChange={(e) => {
                            setStoneCarat(e.target.value);
                            const weight =
                                e.target.value && stonePieces
                                    ? (e.target.value * 0.2 * stonePieces).toFixed(2)
                                    : "";
                            setStoneInternalWeight(weight);
                        }}
                        fullWidth
                        placeholder="Enter carat"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneInternalWeight"]')
                                    ?.focus();
                            }
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Weight (gm)</div>
                <FormControl fullWidth>
                    <TextField
                        type="number"
                        value={stoneInternalWeight}
                        disabled
                        fullWidth
                        placeholder="Auto-calculated weight"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">gm</InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">Rate</div>
                <FormControl fullWidth>
                    <TextField
                        type="number"
                        value={stoneRate}
                        onChange={(e) => {
                            setStoneRate(e.target.value);
                            const total =
                                stoneInternalWeight && e.target.value
                                    ? (
                                        parseFloat(stoneCarat) *
                                        parseFloat(e.target.value)
                                    ).toFixed(2)
                                    : 0;
                            setStoneTotalAmount(total);
                        }}
                        fullWidth
                        placeholder="Enter rate"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">₹</InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={1.33}>
                <div className="label">GST Percentage</div>
                <FormControl fullWidth>
                    <Select
                        value={stoneGSTPercent}
                        onChange={(e) => {
                            setStoneGSTPercent(e.target.value);
                            const baseAmount =
                                stoneInternalWeight && stoneRate
                                    ? parseFloat(stoneInternalWeight) *
                                    parseFloat(stoneRate)
                                    : 0;
                            const gstAmount =
                                baseAmount * (parseFloat(e.target.value) / 100);
                            const total = (baseAmount + gstAmount).toFixed(2);
                            setStoneTotalAmount(total);
                        }}
                        fullWidth
                    >
                        {props.dropdownValues?.[0]?.customization_fields
                            .find((field) => field.name === "gst")
                            ?.property_value.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.display_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    </>)
}

export default AddVariant;