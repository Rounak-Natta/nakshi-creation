import ProductForm from "./productForm";

interface Props {
  product: any;

  categories: {
    id: string;
    name: string;

    children: {
      id: string;
      name: string;
    }[];
  }[];
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