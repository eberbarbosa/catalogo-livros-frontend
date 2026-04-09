import { useLoading } from "@/context/LoadingContext";
import "./LoadingOverlay.css";

const LoadingOverlay = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className="overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;