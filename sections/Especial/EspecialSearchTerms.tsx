interface SearchTerm {
  label: string;
  href: string;
}

interface Props {
  title: string;
  searchTerms: SearchTerm[];
}

export default function SearchTerms({ title, searchTerms }: Props) {
  return (
    <div class="max-w-[1440px] px-6 lg:px-14 mx-auto pb-16">
      <div className="w-full bg-[#BC812E] px-4 py-8">
        <h2 className="text-secondary-neutral-100 text-2xl md:text-3xl font-bold text-center mb-6">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-[80%] mx-auto">
          {searchTerms.map((term) => (
            <a
              key={term.label}
              href={term.href}
              className="px-3 py-1.5 bg-transparent border border-secondary-neutral-100 rounded-3xl text-secondary-neutral-100 
                     hover:bg-secondary-neutral-100 hover:text-[#bc812e] transition-colors duration-200
                     text-sm md:text-sm uppercase font-bold"
              aria-label={`Buscar por ${term.label.toLowerCase()}`}
            >
              {term.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
