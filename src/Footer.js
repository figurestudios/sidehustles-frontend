const Footer = () => {
    return (
        <div id="footer" className="absolute bottom-0 w-full bg-neutral-100">
            <div id="footer-content" className="flex flex-row items-center space-x-8 place-content-center py-2">
            <a href="https://github.com/figurestudios/sidehustles" target="_blank" className="text-black text-center underline text-lg">GitHub</a>
            <a href="https://skynetlabs.com/" target="_blank" className="text-black text-center underline text-lg">Skynet</a>
            <a href="https://polygon.technology/" target="_blank" className="text-black text-center underline text-lg">Polygon</a>
            </div>
        </div>    
    );
};
export default Footer;