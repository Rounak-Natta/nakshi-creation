import ProductForm from "./productForm";

interface Category {
  id: string;
  name: string;

  children: {
    id: string;
    name: string;
  }[];
}

interface Props {
  product: any;
  categories: Category[];
}

export default function ProductEditForm({
  product,
  categories,
}: Props) {
  return (
    <ProductForm
      initialData={product}
      categories={categories}
    />
  );
}