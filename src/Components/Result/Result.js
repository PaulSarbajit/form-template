import "./Result.css";

const Result = (props) => {
  console.log(props);
  return (
    <section>
      {props.showResult && (
        <div>
          <p>
            <strong>Name:</strong> {props.result.name}
          </p>
          <p>
            <strong>Age:</strong> {props.result.age}
          </p>
          <p>
            <strong>Email:</strong> {props.result.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {props.result.phNumber}
          </p>
        </div>
      )}
    </section>
  );
};

export default Result;
