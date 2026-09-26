import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <div className="text-6xl font-bold tracking-tight text-accent-ink">404</div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Страница не найдена</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Возможно, страница была перемещена. Вернитесь на главную или воспользуйтесь контактами.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
          На главную
        </Button>
        <Button href="/contacts" variant="secondary">
          Контакты
        </Button>
      </div>
    </div>
  );
}
