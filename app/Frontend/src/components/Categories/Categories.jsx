import Proptypes from "prop-types";

const Categories = ({ categories }) => {
  console.log(categories);

  return categories.map((category, key) => {
    return (
      <div key={key} className="px-4">
        {category}
      </div>
    );
  });
};

Categories.propTypes = {
  categories: Proptypes.array.isRequired,
};

export default Categories;
