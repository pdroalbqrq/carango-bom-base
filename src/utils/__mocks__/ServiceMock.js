const mockService = (data) => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });
};

export default mockService;
