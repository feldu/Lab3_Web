package lab3.converters;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.faces.convert.FacesConverter;

@FacesConverter("xConverter")
public class XConverter implements Converter {
    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        if (!value.isEmpty() && !value.matches(".*[a-z].*")) {
            try {
                return Double.parseDouble(value.replace(',', '.'));
            } catch (NumberFormatException ignored) {
            }
        }
        throw new ConverterException(new FacesMessage(FacesMessage.SEVERITY_ERROR,
                "Error: ",
                "Shit convert"));
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        return value.toString();
    }
}
