import Image from "apps/website/components/Image.tsx";

interface BulletItem {
    title: string;
    image: string;
    url: string;
}

interface CategoryBulletsProps {
    title: string;
    description: string;
    bullets: BulletItem[];
}

export default function CategoryBullets(props: CategoryBulletsProps) {
    const { bullets, description, title } = props;

    return (
        <div className="text-center uppercase mb-10">
            <h2 className="text-2xl  mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{description}</p>

            <nav className="flex gap-4 max-w-[100vw] overflow-y-auto w-fit mx-auto px-1 ">
                {bullets.map((bullet, index) => (
                    <a
                        key={index}
                        href={bullet.url}
                        className="group flex flex-col"
                    >
                        {/* Imagem com zoom no hover */}
                        <Image
                            width={160}
                            height={160}
                            src={bullet.image}
                            alt={bullet.title}
                            className="object-cover min-w-40 w-40 h-40 transition-transform duration-300 group-hover:scale-[1.03] p-2 my-3 border border-transparent group-hover:border-dark-blue rounded-full"
                        />

                        {/* Título visível abaixo */}
                        <div className="text-sm mt-1 group-hover:font-semibold">
                            {bullet.title}
                        </div>
                    </a>
                ))}
            </nav>
        </div>
    );
}
