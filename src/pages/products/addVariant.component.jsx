import Grid from "@mui/system/Unstable_Grid";
import { FormControl, Select, MenuItem, TextField, InputAdornment } from "@mui/material";

const AddVariant = ({ variantIndex, key, metalType, purity, dropdownValues, quantity, grossWeight, stoneWeight, netWeight, wastagePercent, wastageWeight, netWeightAfterWastage, makingChargeType, makingChargeValue, makingChargeAmount, stoneAmount, hallmarkCharge, gstPercent, rodiumCharge, stoneType, stoneColor, stoneClarity, stoneCut, stonePieces, stoneCarat, stoneRate, stoneInternalWeight, stoneGSTPercent }) => {
    return (<>
        <Grid container spacing={2}>
        <Grid item xs={12}>
                <div className="label">Variant Details {variantIndex + 1}</div>
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
                            // setMetalType(e.target.value);
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
                        // onChange={handlePurityChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.querySelector('input[name="quantity"]')?.focus();
                            }
                        }}
                    >
                        {metalType === "gold" &&
                            dropdownValues?.[0]?.customization_fields
                                .find((field) => field.name === "gold_quality")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                        {metalType === "silver" &&
                            dropdownValues?.[1]?.customization_fields
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
                            // setGrossWeight(e.target.value);
                            // setNetWeight(e.target.value - stoneWeight);
                            // setNetWeightAfterWastage(
                            //     e.target.value - stoneWeight + wastageWeight
                            // );
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
                            // setStoneWeight(e.target.value);
                            // setNetWeight(grossWeight - e.target.value);
                            // setNetWeightAfterWastage(
                            //     grossWeight - e.target.value + wastageWeight
                            // );
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
                            // setWastagePercent(e.target.value);
                            // setWastageWeight(
                            //     (grossWeight - stoneWeight) * (e.target.value / 100)
                            // );
                            // setNetWeightAfterWastage(
                            //     (grossWeight - stoneWeight) * (1 + e.target.value / 100)
                            // );
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
                        value={netWeightAfterWastage}
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
                            // setMakingChargeType(e.target.value);
                            // setMakingChargeValue();
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
                            dropdownValues?.[0]?.customization_fields
                                .find((field) => field.name === "making_charge_type")
                                ?.property_value.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.display_name}
                                    </MenuItem>
                                ))}
                        {metalType === "silver" &&
                            dropdownValues?.[1]?.customization_fields
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
                        // onChange={handleMakingChargeValueChange}
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
                        // onChange={(e) => setMakingChargeAmount(e.target.value)}
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
                        // onChange={(e) => setStoneAmount(e.target.value)}
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
                        // onChange={(e) => setHallmarkCharge(e.target.value)}
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
                        // onChange={(e) => setRodiumCharge(e.target.value)}
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
                            console.log("GST Percent changed:", e.target.value);
                            // setGstPercent(e.target.value);
                        }}
                        fullWidth
                    >
                        {dropdownValues?.[0]?.customization_fields
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
                        // onChange={(e) => setStoneType(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stoneClass"]')
                                    ?.focus();
                            }
                        }}
                    >
                        {dropdownValues?.[0]?.customization_fields
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
                    // onChange={(e) => setStoneColor(e.target.value)}
                    >
                        {dropdownValues?.[0]?.customization_fields
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
                        // onChange={(e) => setStoneClarity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.querySelector('input[name="stoneCut"]')?.focus();
                            }
                        }}
                    >
                        {dropdownValues?.[0]?.customization_fields
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
                        // onChange={(e) => setStoneCut(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document
                                    .querySelector('input[name="stonePieces"]')
                                    ?.focus();
                            }
                        }}
                    >
                        {dropdownValues?.[0]?.customization_fields
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
                            // setStonePieces(e.target.value);
                            // const weight =
                            //     e.target.value && stoneCarat
                            //         ? (stoneCarat * 0.2 * e.target.value).toFixed(2)
                            //         : "";
                            // setStoneInternalWeight(weight);
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
                            // setStoneCarat(e.target.value);
                            // const weight =
                            //     e.target.value && stonePieces
                            //         ? (e.target.value * 0.2 * stonePieces).toFixed(2)
                            //         : "";
                            // setStoneInternalWeight(weight);
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
                            // setStoneRate(e.target.value);
                            // const total =
                            //     stoneInternalWeight && e.target.value
                            //         ? (
                            //             parseFloat(stoneCarat) *
                            //             parseFloat(e.target.value)
                            //         ).toFixed(2)
                            //         : 0;
                            // setStoneTotalAmount(total);
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
                            // setStoneGSTPercent(e.target.value);
                            // const baseAmount =
                            //     stoneInternalWeight && stoneRate
                            //         ? parseFloat(stoneInternalWeight) *
                            //         parseFloat(stoneRate)
                            //         : 0;
                            // const gstAmount =
                            //     baseAmount * (parseFloat(e.target.value) / 100);
                            // const total = (baseAmount + gstAmount).toFixed(2);
                            // setStoneTotalAmount(total);
                        }}
                        fullWidth
                    >
                        {dropdownValues?.[0]?.customization_fields
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