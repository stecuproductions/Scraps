package scraps.model;

public class Specification {
        private String material;
        private int[] dimensions = new int[3];
        private int weightG;
        public Specification(String material, int a, int b, int c , int weightG) {
            this.material = material;
            this.dimensions[0] = a;
            this.dimensions[1] = b;
            this.dimensions[2] = c;
            this.weightG = weightG;
        }
        public String getMaterial() {
            return material;
        }
        public int[] getDimensions() {
            return dimensions;
        }
        public int getWeightG() {
            return weightG;
        }

}
