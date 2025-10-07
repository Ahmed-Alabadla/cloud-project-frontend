interface Type {
  [key: string]: string | number | Record<string, string | number>;
}

const BoxContainer: Type = {
  backgroundColor: '#5885ff',
};

const BoxContainerFooter: Type = {
  maxWidth: 'container',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (min-width: 600px)': {
    flexDirection: 'row',
  },
};

const TypographyBody1: Type = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '18.52px',
  lineHeight: '28px',
  width: 'fit-content',
  height: 'fit-content', textAlign: 'center',
  mx: 'auto',
  // mt: '-20px',
  '@media (max-width: 600px)': {
    width: '100%',
    fontSize: '16px',
    lineHeight: '24px',
    mt: 0,
  },
};

const TypographyH3: Type = {
  color: '#fff',
  fontWeight: '600',
  fontSize: '22.52px',
  lineHeight: '28px',
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: '20px',
    lineHeight: '26px',
  },
};

const TypographyBody2: Type = {
  color: '#fff',
  fontWeight: '500',
  fontSize: '18.52px',
  lineHeight: '28px',
  textAlign: 'center',
  marginTop: '20px',
  '@media (max-width: 600px)': {
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: '10px',
  },
};

const BoxCopy: Type = {
  maxWidth: 'container',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

export {
  BoxContainer,
  BoxContainerFooter,
  TypographyBody1,
  TypographyH3,
  BoxCopy,
  TypographyBody2,
};
