import React from "react";
import AmazonImg from "../assets/amazon.png";
import CognizantImg from "../assets/cognizant.png";
import FlipkartImg from "../assets/flipkart.png";
import HclImg from "../assets/hcl.png";
import InfosysImg from "../assets/infosys.png";
import IntImg from "../assets/lnt.png";
import MahindraImg from "../assets/mahindra.png";
import OracleImg from "../assets/oracle.png";
import PaytmImg from "../assets/paytm.png";
import TcsImg from "../assets/tcs.png";
import VisaImg from "../assets/visa.png";
import MindtreeImg from "../assets/mindtree.png";

const CompanieRelay = () => {
  const companies = [
    { id: 1, name: "Amazon", logo: AmazonImg },
    { id: 2, name: "Cognizant", logo: CognizantImg },
    { id: 3, name: "Flipkart", logo: FlipkartImg },
    { id: 4, name: "HCL", logo: HclImg },
    { id: 5, name: "Infosys", logo: InfosysImg },
    { id: 6, name: "L&T", logo: IntImg },
    { id: 7, name: "Tech Mahindra", logo: MahindraImg },
    { id: 8, name: "Oracle", logo: OracleImg },
    { id: 9, name: "Paytm", logo: PaytmImg },
    { id: 10, name: "TCS", logo: TcsImg },
    { id: 11, name: "Visa", logo: VisaImg },
    { id: 12, name: "Mindtree", logo: MindtreeImg },
  ];

  return (
    <section className="w-full py-16 bg-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy-800 mb-12">
          Companies Rely on Our Candidates
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white p-4 rounded-lg shadow-md w-full h-24 flex items-center justify-center transform transition-transform hover:scale-105"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanieRelay;
