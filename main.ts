import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { ComputeInstance, ComputeNetwork, GoogleProvider } from "@cdktf/provider-google";


class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    class MyStack extends TerraformStack {
      constructor(scope: Construct, name: string) {
        super(scope, name);


        //passe aqui variáveis de ambiente com as credenciais  
        const credentialsPath = "";
        const credentials = "";
    
        new GoogleProvider(this, "Google", {
          region: "us-central1",
          zone: "us-central1-c",
          project: "terraform-cdk",
          credentials,
        });
    
        const network = new ComputeNetwork(this, "Network", {
          name: "cdktf-network",
        });
    
        new ComputeInstance(this, "ComputeInstance", {
          name: "cdktf-instance",
          machineType: "f1-micro",
          bootDisk: {
            initializeParams: {
              image: "debian-cloud/debian-9",
            },
          },
    
          networkInterface: [
            {
              network: network.name,
            },
          ],
          tags: ["web", "dev"],
          dependsOn: [network],
        });
      }
    }
    
    const app = new App();
    new MyStack(app, "typescript-gcp");
    app.synth();
  }
}
