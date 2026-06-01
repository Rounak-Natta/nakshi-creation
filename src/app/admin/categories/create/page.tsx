import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Create Category
      </h1>

      <p className="mt-2 text-muted">
        Add a new category
      </p>

      <CategoryForm />
    </div>
  );
}