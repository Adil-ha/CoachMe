package com.adil.server.service.impl;

import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.OrderDetail;
import com.adil.server.mapper.OrderDetailMapperr;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.Stripe;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@AllArgsConstructor
@Service
public class PaymentService {
    private OrderDetailMapperr orderDetailMapperr;
    private final String API_KEY = "sk_test_51P1FhtKUGlAStujytHclw7d16QSj8uQ1cb9dlmd7yEBJiFbm3uA3TAqeox8ZkcXJAWiPATiUdxqAjr7Q9o7miT5D00RexeTbFF";

    public String createPayment(List<OrderDetailDTO> orderDetailDTOS, Long orderId) throws StripeException {
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderDetailDTO orderDetailDTO : orderDetailDTOS) {
            System.out.println(orderDetailDTO);
            OrderDetail orderDetail = orderDetailMapperr.toEntity(orderDetailDTO);
            float price = orderDetail.getBook().getPrice();
            int quantity = orderDetail.getQuantity();
            totalAmount = totalAmount.add(BigDecimal.valueOf(price).multiply(BigDecimal.valueOf(quantity)));
        }

        // Convert the total amount to cents
        BigDecimal totalAmountCents = totalAmount.multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP);
        System.out.println(totalAmountCents);

        // Set the Stripe API key
        Stripe.apiKey = API_KEY;

        // Create a payment session by adding the payment session details
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/Confirmation?id="+ orderId)
                .setCancelUrl("http://localhost:5173");

        // Add line item with price data including product_data
        if (!orderDetailDTOS.isEmpty()) {
            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("eur")
                                            .setUnitAmountDecimal(totalAmountCents)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName("Order #" + orderId)
                                                            .build())
                                            .build())
                            .build());
        }

        // Create the session
        Session session = Session.create(paramsBuilder.build());

        return session.getUrl();
    }
}
