import Bar from "../../components/Bar";

function Home() {
    const barBrand = (
        <img
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
        />
    )
    const barItems = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Catalog",
            href: "/catalog",
        }
    ];

    return (
        <Bar brand={barBrand} items={barItems} />
    )
}

export default Home;