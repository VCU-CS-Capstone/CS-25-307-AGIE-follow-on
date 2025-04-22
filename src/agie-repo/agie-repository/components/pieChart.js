"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

// Category explanations for the table
const categoryExplanations = {
  Belonging: "Creating supportive environments where women feel valued",
  "Career & Life Integration": "Policies that support work-life balance",
  "Evaluation & Workload":
    "Fair assessment and distribution of responsibilities",
  Harassment: "Prevention and addressing of gender-based harassment",
  "Inclusive Culture": "Building environments that embrace diversity",
  "Leadership & Advancement": "Pathways for women to reach leadership roles",
  Mentorship: "Structured guidance and support programs",
  "Pay Equity": "Equal compensation for equal work and experience",
  Recruitment: "Attracting diverse women faculty to STEMM",
  Retention: "Initiatives to keep women in academic careers",
  "Tenure & Promotion": "Fair processes for career advancement",
};

function PieChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/dataCategories");
      const categories = await response.json();

      // Sort categories alphabetically for consistent order
      categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      const labels = categories.map((category) => category.categoryName);
      const data = categories.map((category) => category.categoryCount);
      setCategoryData(categories);

      const backgroundColor = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(199, 99, 132, 0.6)",
        "rgba(164, 162, 235, 0.6)",
        "rgba(255, 129, 86, 0.6)",
        "rgba(75, 232, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 205, 86, 0.6)",
      ];
      const borderColor = [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199,99,132,1)",
        "rgba(164,162,235,1)",
        "rgba(255,129,86,1)",
        "rgba(75,232,192,1)",
        "rgba(153,102,255,1)",
        "rgba(255,205,86,1)",
      ];

      setChartData((prev) => ({
        ...prev,
        labels,
        datasets: [
          {
            ...prev.datasets[0],
            data,
            backgroundColor,
            borderColor,
          },
        ],
      }));
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend since we're creating a custom one
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.formattedValue || "";
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <p>Loading chart data...</p>
        </div>
      ) : (
        <>
          <div className="h-80 w-full mb-6">
            <Pie data={chartData} options={options} />
          </div>

          <div className="mt-4">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "#00054B" }}
            >
              Category Breakdown
            </h3>
            <div className="bg-gray-50 px-2 py-2 rounded border border-gray-200 max-h-[375px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2 font-medium">Category</th>
                    <th className="text-right p-2 font-medium">Papers</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((category, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-100"
                    >
                      <td className="p-2">
                        <div className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                chartData.datasets[0].backgroundColor[index],
                            }}
                          ></span>
                          <span
                            title={categoryExplanations[category.categoryName]}
                          >
                            {category.categoryName}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-right font-medium">
                        {category.categoryCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PieChart;
