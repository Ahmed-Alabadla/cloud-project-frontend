interface Type {
    [key: string]: string;
}

const boxStyle: Type = {
    marginTop: '150px',
    marginRight: '45px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const textFieldStyle: Type = {
    maxWidth: '120%',
    display: 'flex',
};

const buttonStyle: Type = {
    maxWidth: '120%',
    marginTop: '12px',
    marginBottom: '10px',
};

const gridStyle: Type = {
    height: '100vh',
    overflow: 'hidden',
};

export {
    boxStyle, textFieldStyle, buttonStyle, gridStyle,
};
