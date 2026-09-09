import styles from "./Button.module.css";

function Button({ children, variant, onClick, type }) {
  const buttonClass = variant === "danger" ? styles.danger : styles.primary;

  return (
    <button className={buttonClass} onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
}

export default Button;

//React automatically takes "Delete" (the text sitting between <Button> and </Button>) and hands it to the component as children.

/*<Button variant="danger">Delete</Button>
<Button>Edit</Button>

Notice the second one doesn't pass variant at all 
— meaning inside the component, variant will be undefined */

//Making onClick a prop means Button stays completely generic and reusable, while the actual behavior lives with whoever placed it.

/*If type wasn't provided, it falls back to "button" (safe default, does nothing special on click besides running onClick). If type="submit" was explicitly given, it keeps that instead, letting this specific button trigger form submission. */

/*danger and primary — what they actually are

They are not props. This is an important distinction: danger and primary are just string values that the variant prop can hold. They're also the names of two CSS classes, defined in Button.module.css */
