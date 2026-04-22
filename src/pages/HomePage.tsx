import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Briefcase,
    Cloud,
    Code,
    Container,
    Cpu,
    Database,
    GitBranch,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    MapPin,
    Rocket,
    Server,
    Shield,
    Terminal,
    User,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const HomePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Force dark mode for this page only
    useEffect(() => {
        // Save the previous theme state
        const previousTheme = document.documentElement.classList.contains('dark');
        
        // Force dark mode
        document.documentElement.classList.add('dark');

        // Cleanup: restore previous theme when component unmounts
        return () => {
            if (!previousTheme) {
                document.documentElement.classList.remove('dark');
            }
        };
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    const skills = {
        frontend: [
            { name: 'React', level: 90 },
            { name: 'JavaScript/TypeScript', level: 95 },
            { name: 'HTML/CSS', level: 90 },
            { name: 'Tailwind CSS', level: 85 },
            { name: 'Next.js', level: 80 },
        ],
        backend: [
            { name: 'PHP', level: 88 },
            { name: 'Laravel', level: 85 },
            { name: 'Node.js', level: 82 },
            { name: 'MySQL/PostgreSQL', level: 85 },
            { name: 'RESTful APIs', level: 90 },
        ],
        devops: [
            { name: 'Docker', level: 90 },
            { name: 'Kubernetes', level: 75 },
            { name: 'CI/CD (GitHub Actions, Jenkins)', level: 85 },
            { name: 'Linux Administration', level: 88 },
            { name: 'AWS/GCP', level: 80 },
        ],
    };

    const experiences = [
        {
            title: 'Applications Analyst & Developer',
            company: 'Municipal Government',
            period: '2024 - Present',
            description:
                'Enterprise IT member supporting Oracle PeopleSoft HCM for a large municipal workforce. Own customization, integration, and sustainment across HR, Payroll, and Benefits—partnering with HR and compliance stakeholders so changes stay auditable, payroll stays accurate, and production stays stable.',
            tech: ['PeopleSoft', 'Oracle Cloud', 'Linux', 'Oracle Database', 'PL/SQL'],
        },
        {
            title: 'Lead Software Developer',
            company: 'Advertising Agency',
            period: '2023 - 2024',
            description:
                'Lead engineer on a lean Agile team delivering three B2B/B2C products end to end: React and TypeScript on the client, PHP and MySQL behind the API, Dockerized environments and CI/CD for predictable releases. Focused on measurable gains—latency, SEO, and workflow automation—while keeping technical debt visible and paid down.',
            tech: ['React', 'PHP', 'TypeScript', 'MySQL', 'Docker', 'Linux', 'CI/CD'],
        },
        {
            title: 'Software Developer',
            company: 'Environmental Sustainability Consulting',
            period: '2022 - 2023',
            description:
                'Core contributor on a ten-person engineering org shipping multiple products. Built and extended features in React, Ext JS, Symfony, and Laravel; collaborated on schema and API design so features scaled without constant firefighting.',
            tech: ['React', 'ExtJs', 'Symfony', 'Laravel', 'MySQL', 'Linux', 'CI/CD'],
        },
        {
            title: 'Junior Software Developer',
            company: 'Digital Marketing Agency',
            period: '2020 - 2022',
            description:
                'Primary developer on Ultragranular, a Google Ads keyword optimization product: shipped new capabilities, refactored hot paths for performance, and retired legacy code paths so the codebase stayed understandable for the next hire.',
            tech: ['React', 'PHP', 'TypeScript', 'MySQL', 'Google Ads API', 'Linux', 'CI/CD'],
        },
        {
            title: 'Applications Support Specialist',
            company: 'Digital Marketing Agency',
            period: '2019 - 2022',
            description:
                'Owned infrastructure and tier-2/3 support for hardware, software, and network stacks—servers, routing, switching, and VPS estates. Drove root-cause fixes on repeat incidents, executed low-downtime cloud migrations, and kept patching, backups, and DR drills honest so restores were a procedure, not a hope.',
            tech: ['Windows', 'Linux', 'Network Administration', 'Virtualization', 'Disaster Recovery', 'System Updates', 'Security'],
        },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-linear-to-b from-background via-background to-muted">
            {/* Hero Section */}
            <motion.section
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
            >
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex justify-center mb-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Avatar className="w-32 h-32 border-4 border-primary shadow-2xl bg-linear-to-br from-primary to-purple-600">
                                <AvatarFallback className="bg-linear-to-br from-primary to-[#74dcbc]">
                                    <User className="w-16 h-16 text-primary-foreground" />
                                </AvatarFallback>
                            </Avatar>
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-[#74dcbc] to-[#74dcbc] bg-clip-text text-transparent"
                    >
                        Matt Rodney
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl text-muted-foreground mb-8"
                    >
                        Full-stack engineer · Enterprise apps, integrations, and cloud-ready delivery
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {['React', 'PHP', 'TypeScript', 'Docker', 'PeopleSoft', 'Oracle Cloud'].map((tech) => (
                            <motion.div key={tech} variants={scaleIn}>
                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                    {tech}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex gap-4 justify-center"
                    >

                        <Button style={{ cursor: 'pointer' }} onClick={() => window.open('https://github.com/rdeveloper1925', '_blank')} size="lg" variant="outline" className="gap-2">
                            <Github className="w-4 h-4" />
                            View Projects
                        </Button>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1, duration: 2, repeat: Infinity }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
                            <motion.div
                                className="w-1.5 h-2 bg-muted-foreground rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="py-20 px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
                        <Separator className="w-24 mx-auto h-1 bg-primary" />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Card className="border-2 hover:border-primary transition-colors duration-300">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Code className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-lg text-justify leading-relaxed text-muted-foreground mb-4">
                                            I am a full-stack engineer with a BSc in Information and Communications Technology and six years shipping
                                            and operating production web systems—from lean agency squads to enterprise HR platforms. I work comfortably
                                            across PHP and Laravel, TypeScript and React, relational data, and Linux-based hosting, with a habit of
                                            profiling bottlenecks, tightening release pipelines, and turning product goals into measurable outcomes:
                                            performance, SEO, and iteration guided by real usage data.
                                        </p>
                                        <p className="text-lg text-justify leading-relaxed text-muted-foreground mb-4">
                                            That breadth matters in practice: I have led multi-app delivery, integrated third-party APIs, and supported
                                            the same systems in production. Colleagues get someone who can pair on a React feature in the morning,
                                            trace a database or deployment issue in the afternoon, and explain the trade-offs clearly to non-technical
                                            stakeholders. I aim for reliable releases, sensible security defaults, and interfaces that stay fast on
                                            real devices and networks.
                                        </p>
                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            Outside of work I unwind with factory games—lately{' '}
                                            <a
                                                className="text-purple-500 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://steamcommunity.com/app/1366540"
                                            >
                                                Dyson Sphere Program
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                                    >
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Location</p>
                                            <p className="font-semibold">Toronto, ON</p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                                    >
                                        <Briefcase className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">In technology</p>
                                            <p className="font-semibold">7+ years</p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                                    >
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Education</p>
                                            <p className="font-semibold">BSc, Information & Communications Technology</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="py-20 px-4 bg-muted/30"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
                        <Separator className="w-24 mx-auto h-1 bg-primary" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Frontend Skills */}
                        <motion.div
                            variants={scaleIn}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full border-2 hover:border-primary transition-colors duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Code className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <CardTitle>Frontend</CardTitle>
                                    </div>
                                    <CardDescription>Accessible, responsive UI with an eye for performance and maintainability</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {skills.frontend.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-muted-foreground">{skill.level}%</span>
                                            </div>
                                            <Progress value={skill.level} className="h-2" />
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Backend Skills */}
                        <motion.div
                            variants={scaleIn}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full border-2 hover:border-primary transition-colors duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <Server className="w-6 h-6 text-green-500" />
                                        </div>
                                        <CardTitle>Backend</CardTitle>
                                    </div>
                                    <CardDescription>APIs, data modeling, and services that hold up under real traffic</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {skills.backend.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-muted-foreground">{skill.level}%</span>
                                            </div>
                                            <Progress value={skill.level} className="h-2" />
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* DevOps Skills */}
                        <motion.div
                            variants={scaleIn}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full border-2 hover:border-primary transition-colors duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Rocket className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <CardTitle>DevOps & Cloud</CardTitle>
                                    </div>
                                    <CardDescription>Containers, pipelines, and environments you can repeat and roll back</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {skills.devops.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-muted-foreground">{skill.level}%</span>
                                            </div>
                                            <Progress value={skill.level} className="h-2" />
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* DevOps Specialization Highlight */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-12"
                    >
                        <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <Container className="w-8 h-8 text-primary" />
                                    DevOps Expertise
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    I treat operations as part of the product: reproducible builds, staged rollouts, and
                                    enough observability to catch regressions before users do. That usually means
                                    containers, automated CI/CD, pragmatic cloud usage, and Linux fundamentals—not
                                    chasing every new tool, but choosing what keeps teams shipping safely.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { icon: Container, label: 'Containerization', desc: 'Docker, Kubernetes' },
                                        { icon: GitBranch, label: 'CI/CD', desc: 'GitHub Actions, Jenkins' },
                                        { icon: Cloud, label: 'Cloud Platforms', desc: 'AWS, GCP, Azure' },
                                        { icon: Terminal, label: 'Automation', desc: 'Terraform, Ansible' },
                                        { icon: Database, label: 'Databases', desc: 'MySQL, PostgreSQL, Redis' },
                                        { icon: Cpu, label: 'Monitoring', desc: 'Prometheus, Grafana' },
                                        { icon: Shield, label: 'Security', desc: 'SSL, Secrets Management' },
                                        { icon: Server, label: 'Linux', desc: 'Ubuntu, CentOS, Alpine' },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="p-4 bg-background rounded-lg border text-center"
                                        >
                                            <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                                            <h4 className="font-semibold text-sm mb-1">{item.label}</h4>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="py-20 px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
                        <Separator className="w-24 mx-auto h-1 bg-primary" />
                    </motion.div>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex items-start justify-between flex-wrap gap-4">
                                            <div>
                                                <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                                                <CardDescription className="text-lg">
                                                    <span className="font-semibold text-foreground">{exp.company}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{exp.period}</span>
                                                </CardDescription>
                                            </div>
                                            <div className="p-3 bg-primary/10 rounded-lg">
                                                <Briefcase className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((tech) => (
                                                <motion.div
                                                    key={tech}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Badge variant="outline">{tech}</Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="py-20 px-4 bg-muted/30"
            >
                <div className="max-w-3xl mx-auto">
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
                        <Separator className="w-24 mx-auto h-1 bg-primary" />
                        <p className="text-muted-foreground mt-6 text-lg">
                            If you are hiring for full-stack or enterprise application work—or want a concise walkthrough
                            of something I have shipped—send a note. I respond fastest to specific roles, stacks, and problems.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mail,
                                label: 'Email',
                                value: 'matt@mattapps.org',
                                href: 'mailto:matt@mattapps.org',
                                color: 'text-red-500',
                            },
                            {
                                icon: Github,
                                label: 'GitHub',
                                value: 'github.com/rdeveloper1925',
                                href: 'https://github.com/rdeveloper1925',
                                color: 'text-gray-500',
                            },
                            {
                                icon: Linkedin,
                                label: 'LinkedIn',
                                value: 'linkedin.com/in/mattrodneys',
                                href: 'https://www.linkedin.com/in/mattrodneys/',
                                color: 'text-blue-500',
                            },
                        ].map((contact) => (
                            <motion.div key={contact.label} variants={scaleIn}>
                                <motion.a
                                    href={contact.href}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Card className="h-full border-2 hover:border-primary transition-all duration-300 cursor-pointer">
                                        <CardContent className="pt-6 text-center">
                                            <div
                                                className={`inline-flex p-4 rounded-full bg-muted mb-4 ${contact.color}`}
                                            >
                                                <contact.icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">{contact.label}</h3>
                                            <p className="text-sm text-muted-foreground break-all">{contact.value}</p>
                                        </CardContent>
                                    </Card>
                                </motion.a>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </motion.section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t">
                <div className="max-w-4xl mx-auto text-center text-muted-foreground">
                    <p>© { new Date().getFullYear() } Matt Rodney. Built with React, TypeScript, and Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

