import { AppContext } from "apps/vtex/mod.ts";

interface LoaderResponse {
  status: "success" | "error";
}
const formKeys = ["name", "email", "email1", "email2", "email3"];

export async function action(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<LoaderResponse> {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(
      formKeys.map((key) => [key, formData.get(key)]),
    );
    const isMissingData = Object.values(data).some((value) => !value);
    if (isMissingData) {
      return {
        status: "error",
      };
    }
    const date = new Date();
    const str_date = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await ctx.invoke.vtex.actions.masterdata.createDocument({
      acronym: "IG",
      data: {
        "ig_nome": data.name,
        "ig_email": data.email,
        "ig_email_ind": `${data.email1},${data.email2},${data.email3}`,
        "ig_dt_cadastro": str_date,
      },
    });

    const emailsIndicados = [data.email1, data.email2, data.email3];
    for (const email of emailsIndicados) {
      await ctx.invoke.vtex.actions.masterdata.createDocument({
        acronym: "ID",
        data: {
          "ig_email_ind": email,
          "ig_dt_cadastro": str_date,
        },
      });
    }

    return {
      status: "success",
    };
  } catch (_error) {
    return {
      status: "error",
    };
  }
}

export default function Result(props: LoaderResponse) {
  const msg = props.status === "success"
    ? "Indicação enviada com sucesso!"
    : "Erro ao enviar indicação!";
  return (
    <p>
      {msg}
    </p>
  );
}
