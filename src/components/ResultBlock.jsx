import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const ResultBlock = ({ userSketch }) => {
  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="600"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
      </Card>
    </>
  );
};

export default ResultBlock;
