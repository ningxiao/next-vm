import Image from 'next/image';
type Props = {
    name: string;
    url: string;
};
export default function Avatar({ name, url }: Props) {
    return (
        <div className="flex items-center">
            <div className="w-12 h-12 relative mr-4">
                <Image
                    src={url}
                    layout="fill"
                    className="rounded-full"
                    alt={name}
                />
            </div>
            <div className="text-xl font-bold">{name}</div>
        </div>
    );
}
