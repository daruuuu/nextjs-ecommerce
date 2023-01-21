import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "john@john.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  productsList: [
    {
      name: "Product 1",
      slug: "product-1",
      category: "Outwear",
      image: "/images/outwear.jpg",
      price: 100,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      name: "Product 2",
      slug: "product-2",
      category: "Shirt",
      image: "/images/shirt.jpg",
      price: 250,
      brand: "Brand 2",
      rating: 4.7,
      numReviews: 15,
      countInStock: 16,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      name: "Product 3",
      slug: "product-3",
      category: "Pants",
      image: "/images/pants.jpg",
      price: 700,
      brand: "Brand 3",
      rating: 4.9,
      numReviews: 20,
      countInStock: 0,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      name: "Product 4",
      slug: "product-4",
      category: "Shirt",
      image: "/images/shirt2.jpg",
      price: 400,
      brand: "Brand 4",
      rating: 4.1,
      numReviews: 25,
      countInStock: 36,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      name: "Product 5",
      slug: "product-5",
      category: "Outwear",
      image: "/images/outwear2.jpg",
      price: 800,
      brand: "Brand 5",
      rating: 4.3,
      numReviews: 30,
      countInStock: 0,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
    {
      name: "Product 6",
      slug: "product-6",
      category: "Pants",
      image: "/images/pants2.jpg",
      price: 600,
      brand: "Brand 6",
      rating: 4.5,
      numReviews: 35,
      countInStock: 16,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    },
  ],
};

export default data;
