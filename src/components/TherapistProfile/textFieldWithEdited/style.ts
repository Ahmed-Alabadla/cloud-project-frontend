const getStyle = (dataType: string, themeMode: string) => ({
  width: dataType === "hourlyRate" ? "335px" : "450px",
  margin: "0.5px ", // Adds a small margin around the input
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: themeMode === "dark" ? "#eee" : "black", //#2B127B
    height: "17px",
    marginTop: dataType === "hourlyRate" ? "-5px" : "30px",
  },
  "& input": {
    color: "red",
    fontSize: dataType === "fullName" ? "24px" : "18px",
    fontWeight: dataType === "fullName" ? "bolder" : "bold",
    marginTop: dataType === "hourlyRate" ? "-5px" : "30px",
    height: "17px",
  },
});

export default getStyle;
