import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initialTheme = savedTheme || 'dark';
        
        setTheme(initialTheme);
        
        // Apply theme on mount
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Update DOM
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Save preference
        localStorage.setItem('theme', newTheme);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="fixed top-6 right-6 z-50"
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full w-12 h-12 shadow-lg border-2 bg-background/80 backdrop-blur-sm hover:bg-accent"
                    aria-label="Toggle theme"
                >
                    <motion.div
                        initial={false}
                        animate={{
                            scale: theme === 'dark' ? 1 : 0,
                            opacity: theme === 'dark' ? 1 : 0,
                            rotate: theme === 'dark' ? 0 : 180,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                    >
                        <Moon className="h-5 w-5" />
                    </motion.div>
                    <motion.div
                        initial={false}
                        animate={{
                            scale: theme === 'light' ? 1 : 0,
                            opacity: theme === 'light' ? 1 : 0,
                            rotate: theme === 'light' ? 0 : -180,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                    >
                        <Sun className="h-5 w-5" />
                    </motion.div>
                </Button>
            </motion.div>
        </motion.div>
    );
}

