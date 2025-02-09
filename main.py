class Experience:
    def __init__(self, role, technical_scope, action, method, result):
        self.role = role # Job Title, project name, or internship context
        self.technical_scope = technical_scope # Technologies, tools, or frameworks used
        self.action = action # Specific engineering task or problem solved (X)
        self.method = method # Technical implementation details (Y)
        self.result = result # Quantified outcome or impact (Z)

    def __str__(self):
        return (f"Role: {self.role}\n"
                f"Technical Scope: {self.technical_scope}\n"
                f"Action: {self.action}\n"
                f"Method: {self.method}\n"
                f"Result: {self.result}")

header1 = Experience(
    role="Product Marketing Consultant",
    technical_scope="Marketing tools, Analytics",
    action="Developed a marketing strategy",
    method="Using data-driven insights",
    result="Increased product adoption by 20%" 
)

header2 = Experience(
    role="monkey",
    technical_scope="Money",
    action="Developed a marketing strategy",
    method="Using data-driven insights",
    result="Increased product adoption by 20%" 
)

print(header1, header2)