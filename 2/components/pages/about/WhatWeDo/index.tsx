import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/card";
import { Article, PersonOutline, Public, School, Videocam } from "@mui/icons-material";

const WhatWeDo = () => {
  const items = [
    { icon: <Videocam />, title: "Media Monitoring", description: "Monitor and translate Palestinian media, including TV, radio, and print" },
    { icon: <School />, title: "Educational Analysis", description: "Analyze Palestinian schoolbooks and educational materials" },
    { icon: <Article />, title: "Research Reports", description: "Produce in-depth reports on trends in Palestinian society" },
    { icon: <PersonOutline />, title: "Expert Testimony", description: "Provide expert testimony to governments and international bodies" },
    { icon: <Public />, title: "Public Education", description: "Educate the public through our website, social media, and presentations" },
  ];

  return (
    <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="text-[#00A99D]">{item.icon}</div>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.description}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WhatWeDo;
